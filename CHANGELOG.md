# Changelog

All notable changes to this SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [0.3.0] - 2026-04-13

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

## [0.2.0] - 2026-03-27

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

## [0.1.1] - 2026-03-01

API spec updated: 1.112.0 → 1.115.0

### Changed
- `orders.info` — line items now include `project` (nextgenProject), `group` (nextgenProjectGroup), and `purchase_price` fields
- `orders.info` / `orders.list` — legacy `project` field marked as only available for users with access to the old projects module
- `timeTracking.list` — `relates_to` filter now supports `nextgenProject` and `nextgenProjectGroup` types

## [0.1.0] - 2026-02-12

### Added
- `getTokens` callback for multi-process token resilience — allows reading fresh tokens from a shared store (DB, Redis) before attempting an OAuth refresh, so processes can pick up tokens refreshed by other processes
- `accessToken` is now optional when `getTokens` is provided
- `refresh_token` is optional in the `getTokens` return type — when omitted, the existing refresh token is kept
- `TeamleaderTokenRefreshError` — dedicated error subclass for token refresh failures

### Changed
- `incomingCreditNotes` — added listPayments, registerPayment, removePayment, updatePayment
- `incomingInvoices` — added listPayments, registerPayment, removePayment, updatePayment
- `receipts` — added listPayments, registerPayment, removePayment, updatePayment

## [0.0.1] - 2026-02-12

Initial release — full coverage of the Teamleader Focus API (spec v1.102.0).

### Added
- 68 resources, 278 methods covering the complete Teamleader Focus API
- Auto-generated TypeScript types from OpenAPI specification
- OAuth2 authentication helpers (authorize URL, code exchange, token refresh)
- Automatic token refresh and rate limit handling
- Async pagination helpers (`paginatePages`, `paginateItems`)
- Zero runtime dependencies, ESM-only
