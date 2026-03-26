# Changelog

All notable changes to this SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased] - 2026-03-26

API spec updated: 1.119.0 → 1.127.0

### Changed
- Regenerated types from API spec 1.127.0
- Updated `openapi-typescript` to 7.13.0, `vitest` to 4.1.2
- Improved 401 retry logic — multi-step recovery flow: getTokens → OAuth refresh → fallback getTokens
- `check-spec-update` now reports on Patch 7 status and archives spec versions

### Added
- Patch 7: `tasks.list` — added undocumented `deal_id` filter (accepted by the API but missing from the spec)
- Additional client tests (retry logic, getTokens flow, error handling)

## [1.1.1] - 2026-03-01

API spec updated: 1.112.0 → 1.115.0

### Changed
- `orders.info` — line items now include `project` (nextgenProject), `group` (nextgenProjectGroup), and `purchase_price` fields
- `orders.info` / `orders.list` — legacy `project` field marked as only available for users with access to the old projects module
- `timeTracking.list` — `relates_to` filter now supports `nextgenProject` and `nextgenProjectGroup` types

## [1.1.0] - 2026-02-12

### Added
- `getTokens` callback for multi-process token resilience — allows reading fresh tokens from a shared store (DB, Redis) before attempting an OAuth refresh, so processes can pick up tokens refreshed by other processes
- `accessToken` is now optional when `getTokens` is provided
- `refresh_token` is optional in the `getTokens` return type — when omitted, the existing refresh token is kept

## [1.0.1] - 2026-02-12

API spec updated: → 1.107.0

### Added
- `TeamleaderTokenRefreshError` — dedicated error subclass for token refresh failures, with the hint from the Teamleader error response in the message (e.g. "Token refresh failed: Token has been revoked")

### Changed
- `incomingCreditNotes.listPayments()` — list payments for an incoming credit note
- `incomingCreditNotes.registerPayment()` — register a payment for an incoming credit note
- `incomingCreditNotes.removePayment()` — remove a payment from an incoming credit note
- `incomingCreditNotes.updatePayment()` — update a payment for an incoming credit note
- `incomingInvoices.listPayments()` — list payments for an incoming invoice
- `incomingInvoices.registerPayment()` — register a payment for an incoming invoice
- `incomingInvoices.removePayment()` — remove a payment from an incoming invoice
- `incomingInvoices.updatePayment()` — update a payment for an incoming invoice
- `receipts.listPayments()` — list payments for a receipt
- `receipts.registerPayment()` — register a payment for a receipt
- `receipts.removePayment()` — remove a payment from a receipt
- `receipts.updatePayment()` — update a payment for a receipt

## [1.0.0] - 2026-02-12

Initial release — full coverage of the Teamleader Focus API (spec v1.102.0).

### Added
- 68 resources, 278 methods covering the complete Teamleader Focus API
- Auto-generated TypeScript types from OpenAPI specification
- OAuth2 authentication helpers (authorize URL, code exchange, token refresh)
- Automatic token refresh and rate limit handling
- Async pagination helpers (`paginatePages`, `paginateItems`)
- Zero runtime dependencies, ESM-only
