# Changelog

All notable changes to this SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased] - 2026-07-19

API spec updated: → 1.183.0

## [1.1.0] - 2026-06-28

API spec updated: 1.157.0 → 1.170.0

### Added
- `notes.delete()` method on `NotesResource`.
- `userSchedules.list()` method on new `UserSchedulesResource` — returns
  per-day working schedules for one or more users over a date range
  (max 7 days). Replaces the now-deprecated `users.getWeekSchedule`.
- `invoices.draft`: optional `quotation_id` — links the created invoice
  to its source quotation and marks the deal as won.
- `deals.create` / `deals.update`: `purchase_order_number`.
- `tickets.create` / `tickets.update`: `project_id` (for new-projects
  accounts; mutually exclusive with `milestone_id`).
- `customFieldDefinitions.create`: `required: boolean`.
- `customFieldDefinitions.list`: `default_value` (nullable; only for
  `single_select` type).
- `invoices.download`: new format `ubl/xrechnung`.
- `creditNotes.download`: new formats `ubl/peppol_bis_3`, `ubl/xrechnung`.
- `users.me`: `teams` array.
- `departments.info`: Belgian tax-regime codes `RF01`–`RF12`.
- `files.list`: subject types `meeting`, `product`, `project`.

### Changed
- **Breaking (types reflect upstream rename — runtime calls with old
  values were already failing).**
  - `quotations.list` / `quotations.info`: status enum
    `closed` & `rejected` → `refused`.
  - `expenses.list`: status enum `unpaid` → `not_paid`; added
    `unknown`, `partially_paid`, `credited`.
  - `bookkeepingSubmissions.list`: subject-type enum
    `incoming_invoice` → `incomingInvoice`,
    `incoming_credit_note` → `incomingCreditNote`. Upstream
    finally fixed this, so internal Patch 8 has been removed
    (`scripts/generate-types.ts`).
  - `plannableItems.list` / `plannableItems.info` /
    `reservations.list`: property `currency` → `unit`.
  - `meetings.list`: typo fix `creaded_by` → `created_by`.
  - `tasks.list`: sort field options replaced — `name` →
    `created_at` and `due_on`.
  - `cloudPlatforms.url`: response is now a `oneOf` discriminated
    on `type`. For `type=deal` it returns `{ public, preview }`;
    for `invoice`/`quotation`/`ticket` it still returns `{ url }`.
  - `incomingCreditNotes.*` (8 endpoints) and `receipts.*` (7
    endpoints): request body is now marked `required: true` in
    the spec (was effectively required at runtime, now enforced
    by types).

### Deprecated
- `users.getWeekSchedule` — replaced by `userSchedules.list`. Will
  be removed in a future major version of the upstream API.

### Removed
- `workTypes.list`: the `sort` parameter is gone from the spec.

### Internal
- Removed obsolete spec-patch (Patch 8 — bookkeepingSubmissions
  enum camelCase) — fixed upstream in spec 1.170.0.
- README Resources table updated with `userSchedules` and
  `notes.delete`.
- Live integration test for `notes.delete` in
  `tests/integration/03-crm-contacts-companies.test.ts`.
- Also bundles the audit-infrastructure work originally targeted
  at 1.0.1 (see entry dated 2026-05-19 below — `npm run audit`).

Target version for this Unreleased section: **1.1.0** (MINOR — new
resource and methods; the enum/property-rename changes are passed
through from upstream and tighten types to match real runtime
behavior).

## [1.1.0] - 2026-05-19 (audit infrastructure — bundled into 1.1.0)

API spec updated: → 1.157.0

### Added
- `/calls.delete` endpoint
- Live integration test for `calls.delete` in `tests/integration/05-activities.test.ts`
  (closes the live-coverage gap surfaced by the audit's principle VI check).
- **Internal: quality audit infrastructure.** New `npm run audit`
  command runs four cross-cutting checks against the SDK source:
  - **Cross-resource consistency** across all 68 resources (method
    name divergences, parameter-shape divergences, return-envelope
    divergences). Refuses to auto-arbitrate canonical forms; surfaces
    every divergence with full variant context for human review.
  - **Constitution-principle compliance** per file × per principle
    (spec-generated types, multi-runtime portability, zero runtime
    deps, typed errors, live integration coverage).
  - **Documentation accuracy** — cross-checks the README Resources
    table against the actual client exports + identifies snippet
    drift.
  - **CHANGELOG accuracy** — flags entries with no matching git tag
    and ranges where `src/index.ts` changed but the entry is thin.
  Each run produces six committable artifacts under
  `specs/001-sdk-quality-audit/` (markdown for review + JSON sidecars
  for diffing). Reproducible byte-for-byte on the same SHA (FR-009).
  Zero new runtime or dev dependencies. See
  `specs/001-sdk-quality-audit/quickstart.md` for usage.

Target version for this Unreleased section: **1.0.1** (PATCH —
audit infrastructure is internal tooling under `scripts/`, no public
SDK surface change).

## [1.0.0] - 2026-04-14

First stable release. Commits to semver: no breaking changes in minor versions
from this point on — only in `2.0.0` and beyond.

### Added
- **Typed error body accessors on every error class.** Teamleader's error
  response shape (`{ errors: [{ code?, title, status, meta? }] }`) is now
  exposed via `err.errors`, `err.title`, and `err.field` getters, so users
  don't need to cast `err.body` manually:
  ```ts
  } catch (err) {
    if (err instanceof TeamleaderFocusValidationError) {
      console.log(err.field);  // "project_id"
      console.log(err.title);  // "project_id must be valid"
      console.log(err.errors); // full array
    }
  }
  ```
  `err.body` still exposes the raw parsed JSON for advanced cases.
- **`TeamleaderApiError` and `TeamleaderApiErrorBody`** exported from the
  SDK root for typing code that wraps our errors.
- **`TeamleaderFocusValidationError.message`** now defaults to the first
  error's `title` instead of a generic "Validation error" string, making
  unhandled errors log usefully out of the box.

### Changed
- **Spec-patch drift monitoring.** `npm run generate` now fails with exit 1
  when any of the 9 post-generation patches doesn't apply cleanly. Types
  are still written (so you can inspect the shape), but a clear drift
  report is printed so you know whether the upstream spec was fixed
  (patch obsolete) or its shape shifted (patch needs updating).

### Concurrency & reliability (verified in `tests/stress.test.ts`)
- Refresh mutex deduplicates 50+ concurrent 401s into a single token refresh
- Rate-limit retry + exponential backoff recovers paginators under sustained 429s
- `AbortSignal` stops paginators cleanly mid-iteration
- `onTokenRefresh` callback fires exactly once per refresh, even under load

### Integration-verified against the live API
- Full `files.upload` → raw binary POST → `files.list` → `files.info` →
  `files.download` → byte-identical roundtrip
- All CRUD flows across 68 resources with 376 passing integration tests

## [0.7.0] - 2026-04-14

### Changed (breaking)
- `.list()` / `paginateItems()` / `paginatePages()` no longer default to
  `maxPages: 100`. Default is now `Infinity` — the iterator stops naturally
  when the API returns an empty or short page, so `for await` reliably
  yields *every* item. Users who want a safety cap can still pass
  `{ maxPages: N }` explicitly. This prevents silent data truncation at
  10k items for anyone with a large dataset.

### Added
- **`AbortSignal` support.** Pass `signal` on the client config to cancel
  every request from that client, or per-request via
  `client.request(endpoint, body, { signal })`. Paginating iterators
  (`paginateItems`, `paginatePages`, every resource `.list()`) accept
  `{ signal }` in their options and stop cleanly mid-iteration.
  ```ts
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 5000);
  for await (const c of client.contacts.list({}, { signal: controller.signal })) {
    // stops after 5s
  }
  ```
- **`userAgent` config.** Identify your integration in Teamleader's
  server logs. Default: `teamleader-focus-js-sdk/<version>`. Override:
  ```ts
  new TeamleaderFocusClient({ accessToken, userAgent: "MyApp/1.2" });
  ```
- **`customField(entity, fieldId)` helper.** One-line reader for
  `entity.custom_fields[].value` by definition id, with generic typing:
  ```ts
  import { customField } from "teamleader-focus-js-sdk";
  const birthday = customField<string>(contact, "bf6765de-...");
  ```
- Exported `SDK_VERSION` constant for runtime introspection.

## [0.6.0] - 2026-04-13

### Changed (breaking)
- `.list()` methods on every resource now return an `AsyncIterable<Item>`
  that auto-paginates across every page, instead of a `Promise` resolving
  to a single page `{ data, meta }`. This eliminates the need to reason
  about pagination at the call site — just iterate.

  **Migration:**
  ```diff
  - const { data } = await teamleader.contacts.list({ filter: { term: "John" } });
  - for (const contact of data) { /* … */ }
  + for await (const contact of teamleader.contacts.list({ filter: { term: "John" } })) {
  +   /* … */
  + }
  ```

  Each `.list(params, options)` call accepts an optional `options` object
  (`{ maxPages?: number }`) as a second argument. Resources without a
  request body (e.g. `dayOffTypes.list`) use `list(undefined, options)`.

  The low-level client primitives `client.paginateItems(endpoint, params, options)`
  and `client.paginatePages(endpoint, params, options)` are unchanged —
  use them if you need access to per-page `meta` or to iterate endpoints
  not covered by a resource class.

### Added
- `ListItem<Op>` type helper in `types/common.ts` — extracts the element
  type from a list-style response, used by every `.list()` signature so
  each yielded item is fully typed.

## [0.5.0] - 2026-04-14

### Changed (breaking)
- All public classes renamed with `Focus` prefix for naming consistency
  with the package name and to disambiguate from a potential future
  Teamleader Orbit SDK:

  | Old | New |
  | --- | --- |
  | `TeamleaderClient` | `TeamleaderFocusClient` |
  | `TeamleaderClientConfig` | `TeamleaderFocusClientConfig` |
  | `TeamleaderError` | `TeamleaderFocusError` |
  | `TeamleaderAuthenticationError` | `TeamleaderFocusAuthenticationError` |
  | `TeamleaderTokenRefreshError` | `TeamleaderFocusTokenRefreshError` |
  | `TeamleaderRateLimitError` | `TeamleaderFocusRateLimitError` |
  | `TeamleaderValidationError` | `TeamleaderFocusValidationError` |
  | `TeamleaderNetworkError` | `TeamleaderFocusNetworkError` |

  Migration is a pure find-and-replace. The runtime `.name` property on
  each error class is also updated.

## [0.4.0] - 2026-04-14

### Changed (breaking)
- Pagination is now on the client: `client.paginateItems(endpoint, params, options)`
  and `client.paginatePages(endpoint, params, options)` instead of the top-level
  `paginateItems(client, ...)` / `paginatePages(client, ...)` exports.
  The old named exports are removed. Only exports kept are the type aliases
  `PaginatedRequest` and `PaginatedResponse`.

  **Migration:**
  ```diff
  - import { paginateItems } from "teamleader-focus-js-sdk";
  - for await (const x of paginateItems(client, "/contacts.list", {})) {}
  + for await (const x of client.paginateItems("/contacts.list", {})) {}
  ```

### Added
- Example: `examples/supabase-companies-and-contacts.ts` — full-featured
  Supabase Edge Function showing pagination, error handling, cleanup on
  partial failure, token persistence via Supabase tables, and `getTokens`
  for multi-process safety.

## [0.3.1] - 2026-04-14

### Added
- `scripts/verify-endpoints.ts` — TypeScript-compiler-based verification: per
  endpoint checks SDK method presence, endpoint URL match, and type-validity
  of every unit + integration test call. Run with `npm run verify:endpoints`.
- Integration test setup now persists refreshed OAuth tokens back to `.env`
  so subsequent runs don't fail with "Token has been revoked" after a rotation.

### Fixed
Discovered via `verify:endpoints`, fixed against the actual spec:

**Integration test bugs (25)**:
- `users.listDaysOff`: `started_after`/`ended_before` → `starts_after`/`ends_before`
- `tasks.list`: `assignee_id` → `user_id`
- `meetings.list`: `starts_after`/`ends_before` → `start_date`/`end_date`
- `events.list`: `starts_after`/`ends_before` → `ends_after`/`starts_before` (datetime format)
- `calls.list`: removed unsupported `user_id`, use `scheduled_after`
- `calls.complete`: `outcome_id` → `call_outcome_id`
- `timers.update`: operates on current running timer, no `id` parameter
- `timers.stop`: takes no body
- `timeTracking.update`: added required `duration` + `started_on`/`started_at`
- `invoices.draft`: added required `payment_term`
- `receipts.add`: removed non-existent `tax_exclusive` field
- `projects.close`: added required `closing_strategy`
- `projects.delete` / `projectTasks.delete` / `projectGroups.delete`: added required `delete_strategy`
- `projectMaterials.list`: removed unsupported `page` field
- `tickets.getMessage`: only `message_id` (no ticket id)
- `legacyProjects.updateParticipant`: added required `role`
- `businessTypes.list`: body itself is required (`list({})`)

**Unit tests**: removed all 117 unjustified `as any` casts in `tests/resources.test.ts`. Every unit-test call now uses fully-typed minimal params verified against the generated types. Along the way, 40+ unit-test calls had wrong field names or missing required fields — all fixed.

### Changed
- Tests folder is no longer in `.gitignore` (was a mistake — integration tests must be version-controlled).

## Pre-tagging early development (v0.0.1 – v0.3.0)

> The entries below predate the repo's release-tagging discipline,
> which started at `v0.3.1`. Their commits exist in `git log` but were
> never explicitly tagged. The entries are preserved here for
> historical context; if you need to pin to one of these versions, use
> the corresponding commit SHA from `git log` rather than a tag.

### [0.3.0] - 2026-04-13

### Added
- API spec updated: 1.129.0 → 1.136.0
- Patch 8: `bookkeepingSubmissions` filter.subject.type — spec uses snake_case but API expects camelCase
- Integration tests: error boundary tests (invalid IDs, missing fields, state violations)
- Integration tests: filtering, pagination, and sorting verification
- Integration tests: custom fields lifecycle with partial update strategy
- Integration tests: `invoices.send`, `quotations.send`, `tickets.addReply`, `emailTracking`, `cloudPlatforms.url`, `bookkeepingSubmissions.list`, `contacts.uploadAvatar`, `companies.uploadLogo`
- Unit tests: expanded from 82 to 342 tests — full resource method coverage
- Unit tests: timeout, concurrent refresh deduplication, onTokenRefresh callback failure, non-JSON response
- `npm run test:coverage` — static analysis script that reports which API endpoints have integration tests
- JSDoc comments on all resource methods
- Shared test data constants (`tests/integration/test-data.ts`)

### Changed
- Default page size changed from 20 to 100 (Teamleader API maximum)
- Paginator now clamps page size to max 100
- Paginator no longer yields empty trailing pages when total items is exact multiple of page size
- Added jitter to exponential backoff on server errors (prevents thundering herd)
- Added minimum 100ms wait floor on rate limit retries
- Patch 1 (NoteSubjectTypesCreate "meeting") marked as resolved — spec now includes it natively

### Fixed
- Paginator bug: empty page was yielded before the break check, causing consumers to receive a spurious empty page

### [0.2.0] - 2026-03-27

API spec updated: 1.119.0 → 1.129.0

### Added
- `events.create` / `events.update` — new `project_id` and `group_id` fields (mutually exclusive with `milestone_id`)
- `subscriptions` — new `purchase_order_number` and `delivery_information` fields on list, info, and create
- Patch 5 & 6 status checks in `check-spec-update`
- Patch 7: `tasks.list` — added undocumented `deal_id` filter (accepted by the API but missing from the spec)
- Additional client tests (retry logic, getTokens flow, error handling)

### Changed
- Regenerated types from API spec 1.129.0
- Updated `openapi-typescript` to 7.13.0, `vitest` to 4.1.2
- Improved 401 retry logic — multi-step recovery flow: getTokens → OAuth refresh → fallback getTokens
- `check-spec-update` now reports on Patch 5, 6, 7 status and archives spec versions
- Scripts now read spec from `api-specs/` directory (versioned files) instead of single `api-spec.yaml`
- Fixed optional/required params on several `.list()` and `.stop()` methods to match the spec

### [0.1.1] - 2026-03-01

API spec updated: 1.112.0 → 1.115.0

### Changed
- `orders.info` — line items now include `project` (nextgenProject), `group` (nextgenProjectGroup), and `purchase_price` fields
- `orders.info` / `orders.list` — legacy `project` field marked as only available for users with access to the old projects module
- `timeTracking.list` — `relates_to` filter now supports `nextgenProject` and `nextgenProjectGroup` types

### [0.1.0] - 2026-02-12

### Added
- `getTokens` callback for multi-process token resilience — allows reading fresh tokens from a shared store (DB, Redis) before attempting an OAuth refresh, so processes can pick up tokens refreshed by other processes
- `accessToken` is now optional when `getTokens` is provided
- `refresh_token` is optional in the `getTokens` return type — when omitted, the existing refresh token is kept
- `TeamleaderFocusTokenRefreshError` — dedicated error subclass for token refresh failures

### Changed
- `incomingCreditNotes` — added listPayments, registerPayment, removePayment, updatePayment
- `incomingInvoices` — added listPayments, registerPayment, removePayment, updatePayment
- `receipts` — added listPayments, registerPayment, removePayment, updatePayment

### [0.0.1] - 2026-02-12

Initial release — full coverage of the Teamleader Focus API (spec v1.102.0).

### Added
- 68 resources, 278 methods covering the complete Teamleader Focus API
- Auto-generated TypeScript types from OpenAPI specification
- OAuth2 authentication helpers (authorize URL, code exchange, token refresh)
- Automatic token refresh and rate limit handling
- Async pagination helpers (`paginatePages`, `paginateItems`)
- Zero runtime dependencies, ESM-only
