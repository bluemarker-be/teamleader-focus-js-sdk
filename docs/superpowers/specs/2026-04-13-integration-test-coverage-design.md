# Integration Test Coverage Design

## Goal

Production confidence: every SDK endpoint is proven to work against the real Teamleader Focus API. AI-generated code must be verified, not trusted on faith.

## Shared Test Data

Centralize test constants in `tests/integration/test-data.ts` so every test file uses the same predictable values. This replaces the scattered hardcoded strings across test files.

```typescript
// tests/integration/test-data.ts
export const TEST = {
  email: "test-sdk@operative.pro",
  contact: { first_name: "SDK", last_name: "IntegrationTest" },
  company: { name: "SDK Test Corp" },
  deal: { title: "SDK Test Deal" },
  project: { title: "SDK Test Project" },
  invoice: { description: "SDK test line item" },
  tag: "sdk-integration-test",
} as const;
```

All test data is prefixed with "SDK" so it's easy to identify and clean up. The email `test-sdk@operative.pro` is used for all send/reply endpoints.

## Architecture: Three Test Layers

### Layer 1 — Endpoint Smoke Tests

Every endpoint called once with minimal valid params. Verifies:
- SDK sends the correct URL and method
- API returns a parseable response (not 404, not 500)
- Response shape matches expectations (has `data`, correct types)

This is largely what the current tests already do. Gaps to fill:
- `bookkeepingSubmissions.list` (needs a valid subject filter — use an existing booked invoice)
- `contacts.uploadAvatar` / `companies.uploadLogo` (investigate API param format)
- `invoices.send` — send to `test-sdk@operative.pro`
- `quotations.send` — send to `test-sdk@operative.pro`
- `tickets.addReply` — reply goes to `test-sdk@operative.pro`
- `emailTracking.list/create` — tracks an email against a Teamleader resource, no external integration needed
- `cloudPlatforms.url` — returns a URL for a resource on Teamleader's cloud platform

Skipped endpoints (require external systems that cannot be set up in tests):
- `invoices.sendViaPeppol`, `creditNotes.sendViaPeppol` — requires Peppol configuration
- `migrate.*` — requires legacy system IDs (pre-migration data)
- `*.sendToBookkeeping` — requires bookkeeping integration (Exact, Yuki, etc.)

These stay skipped with clear reason annotations.

### Layer 2 — Behavior Tests

Per domain, test business logic beyond CRUD:

**Filtering & Sorting:**
- `contacts.list` with `filter.term` — verify results actually contain the search term
- `deals.list` with `filter.status` — verify returned deals match the status
- `invoices.list` with `filter.department_id` — verify department match
- Sort by field — verify ordering is correct

**Pagination:**
- Call a list endpoint with `page.size: 2` on a resource with 3+ items
- Verify `meta.matches` reflects total count
- Verify page 2 returns different items than page 1
- Verify the SDK paginator (`paginatePages`, `paginateItems`) works end-to-end against real data

**State Machines:**
- Deal lifecycle: create → move → win (verify state changes via info)
- Invoice lifecycle: draft → book → registerPayment → credit (verify status at each step)
- Project lifecycle: create → close → reopen → delete
- Incoming invoice: add → markAsPendingReview → approve → registerPayment → refuse flow

**Custom Fields:**
- Create a custom field definition
- Create a contact with custom_fields set
- Update with `custom_fields_update_strategy: "partial"` — verify only specified fields change
- Update without strategy — verify all custom fields are replaced

**Includes / Side-loading:**
- `contacts.info` with `includes` parameter — verify related data is returned
- `deals.info` with `includes` — verify lead/phase data is included

### Layer 3 — Error Boundary Tests

Verify the SDK throws the correct error subclass for known failure modes:

**Invalid ID:**
- `contacts.info({ id: "non-existent-uuid" })` → expect 404 or validation error
- Verify error has `.status` and `.body` properties

**Missing Required Fields:**
- `deals.create({})` without `title` or `lead` → expect `TeamleaderValidationError`
- Verify error body contains actionable message

**State Violations:**
- `invoices.update` on a booked invoice → expect error (must use `updateBooked`)
- `invoices.delete` on a booked invoice → expect error
- `deals.win` on an already-won deal → observe behavior

**Permission / Feature Gates:**
- `daysOff.import` when external days off is disabled → expect 403
- Already handled with try/catch in current tests, but should explicitly verify error type

## Runtime Coverage Tracker

A transparent wrapper that intercepts every `client.request()` call during integration tests and records which endpoints were hit.

### Implementation

**`tests/integration/coverage-tracker.ts`:**
```typescript
import type { TeamleaderClient } from "../../src/client.js";

const hitEndpoints = new Set<string>();

export function trackCoverage(client: TeamleaderClient): void {
  const originalRequest = client.request.bind(client);
  client.request = async function<T>(endpoint: string, body?: unknown): Promise<T> {
    hitEndpoints.add(endpoint);
    return originalRequest(endpoint, body);
  };
}

export function getCoverageReport(allEndpoints: string[]): {
  covered: string[];
  missing: string[];
  skipped: Array<{ endpoint: string; reason: string }>;
  untested: string[];
  percentage: number;
} {
  const covered = allEndpoints.filter(ep => hitEndpoints.has(ep));
  const missing = allEndpoints.filter(ep => !hitEndpoints.has(ep));
  const skipped = missing
    .filter(ep => SKIPPED_ENDPOINTS[ep])
    .map(ep => ({ endpoint: ep, reason: SKIPPED_ENDPOINTS[ep] }));
  const untested = missing.filter(ep => !SKIPPED_ENDPOINTS[ep]);
  return {
    covered,
    missing,
    skipped,
    untested,
    percentage: Math.round((covered.length / allEndpoints.length) * 100),
  };
}

const SKIPPED_ENDPOINTS: Record<string, string> = {
  "/invoices.sendViaPeppol": "requires Peppol configuration",
  "/creditNotes.sendViaPeppol": "requires Peppol configuration",
  "/migrate.id": "requires legacy system IDs",
  "/migrate.taxRate": "requires legacy tax rate ID",
  "/migrate.activityType": "requires legacy activity type ID",
  "/incomingInvoices.sendToBookkeeping": "requires bookkeeping integration",
  "/incomingCreditNotes.sendToBookkeeping": "requires bookkeeping integration",
  "/receipts.sendToBookkeeping": "requires bookkeeping integration",
};
```

**Integration in `setup.ts`:**
- `getClient()` wraps the client with `trackCoverage()` automatically
- The endpoint list comes from the API spec (parsed at test time from the latest YAML)

**Report output (at end of suite):**
```
--- Integration Test Coverage ---
Endpoints hit: 254/262 (97%)

Intentionally skipped (8):
  /invoices.sendViaPeppol — requires Peppol configuration
  /creditNotes.sendViaPeppol — requires Peppol configuration
  /migrate.id — requires legacy system IDs
  ...

Untested (0):
  (none — all non-skipped endpoints are covered)
```

The report runs in a `globalTeardown` hook so it prints once after all test files complete. The key metric is **untested count = 0**: every endpoint is either covered or has a documented skip reason.

## File Structure

```
tests/integration/
  setup.ts                        — client singleton, helpers (existing)
  test-data.ts                    — NEW: shared test constants
  coverage-tracker.ts             — NEW: runtime coverage tracking
  coverage-teardown.ts            — NEW: globalTeardown that prints report
  01-read-only.test.ts            — existing, extend with filter verification
  02-users-and-account.test.ts    — existing, complete
  03-crm-contacts-companies.test.ts — existing, add custom fields + uploadAvatar
  04-crm-deals.test.ts            — existing, add filter/sort verification
  05-activities.test.ts           — existing, complete
  06-products-invoicing.test.ts   — existing, add send endpoints + state verification
  07-purchasing.test.ts           — existing, complete
  08-projects-v2.test.ts          — existing, complete
  09-admin-and-special.test.ts    — existing, add bookkeepingSubmissions + emailTracking + cloudPlatforms
  10-token-refresh.test.ts        — existing, complete
  11-currency-exchange-rate.test.ts — existing, complete
  12-error-boundaries.test.ts     — NEW: invalid IDs, missing fields, state violations
  13-filtering-pagination.test.ts — NEW: filter correctness, sort, pagination
  14-custom-fields.test.ts        — NEW: custom field CRUD + partial update strategy
```

## Execution

```bash
# Full suite (all layers)
npm run test:integration

# Quick smoke test (layer 1 only — future optimization)
# Could use vitest tags or file patterns to select layers
```

## Success Criteria

- Coverage tracker reports **untested = 0** (every endpoint is either covered or has a documented skip reason)
- All happy-path tests pass
- Error boundary tests verify correct error subclasses
- Filter tests verify actual result contents, not just array shape
- Pagination test proves page 2 != page 1
- Custom fields partial update is verified against real API
- Send endpoints (`invoices.send`, `quotations.send`, `tickets.addReply`) tested with `test-sdk@operative.pro`
- `emailTracking` and `cloudPlatforms.url` tested
- All test data uses shared constants from `test-data.ts`
