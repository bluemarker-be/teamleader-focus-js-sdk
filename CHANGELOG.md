# Changelog

All notable changes to this SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased] - 2026-02-12

API spec updated: → 1.107.0

### Added
- `/incomingCreditNotes.listPayments` endpoint
- `/incomingCreditNotes.registerPayment` endpoint
- `/incomingCreditNotes.removePayment` endpoint
- `/incomingCreditNotes.updatePayment` endpoint
- `/incomingInvoices.listPayments` endpoint
- `/incomingInvoices.registerPayment` endpoint
- `/incomingInvoices.removePayment` endpoint
- `/incomingInvoices.updatePayment` endpoint
- `/receipts.listPayments` endpoint
- `/receipts.registerPayment` endpoint
- `/receipts.removePayment` endpoint
- `/receipts.updatePayment` endpoint

## [1.0.0] - 2026-02-12

Initial release — full coverage of the Teamleader Focus API (spec v1.102.0).

### Added
- 68 resources, 278 methods covering the complete Teamleader Focus API
- Auto-generated TypeScript types from OpenAPI specification
- OAuth2 authentication helpers (authorize URL, code exchange, token refresh)
- Automatic token refresh and rate limit handling
- Async pagination helpers (`paginatePages`, `paginateItems`)
- Zero runtime dependencies, ESM-only
