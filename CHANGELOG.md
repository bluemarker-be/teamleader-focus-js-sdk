# Changelog

All notable changes to this SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

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
