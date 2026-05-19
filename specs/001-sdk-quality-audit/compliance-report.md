# Compliance Report

**Branch**: `001-sdk-quality-audit` · **SHA**: `996b993121e13369a8284c18147a30ff53c80dc1`

Files audited: **97** · 221 ✓ · 1 ~ · 2 ✗ · 358 · (n/a)

## Per-file × per-principle grid

| File                                      | I | II | III | IV | V | VI | Findings                                             |
|-------------------------------------------|---|----|-----|----|---|----|------------------------------------------------------|
| package.json                              | · | ·  | ·   | ✓  | · | ·  |                                                      |
| scripts/audit-changelog.ts                | · | ·  | ·   | ·  | · | ·  |                                                      |
| scripts/audit-compliance.ts               | · | ·  | ·   | ·  | · | ·  |                                                      |
| scripts/audit-consistency.ts              | · | ·  | ·   | ·  | · | ·  |                                                      |
| scripts/audit-docs.ts                     | · | ·  | ·   | ·  | · | ·  |                                                      |
| scripts/audit-lib/ast.ts                  | · | ·  | ·   | ·  | · | ·  |                                                      |
| scripts/audit-lib/findings.ts             | · | ·  | ·   | ·  | · | ·  |                                                      |
| scripts/audit-lib/git.ts                  | · | ·  | ·   | ·  | · | ·  |                                                      |
| scripts/audit-lib/render.ts               | · | ·  | ·   | ·  | · | ·  |                                                      |
| scripts/audit-lib/types.ts                | · | ·  | ·   | ·  | · | ·  |                                                      |
| scripts/audit.ts                          | · | ·  | ·   | ·  | · | ·  |                                                      |
| scripts/check-spec-update.ts              | · | ·  | ·   | ·  | · | ·  |                                                      |
| scripts/check-test-coverage.ts            | · | ·  | ·   | ·  | · | ·  |                                                      |
| scripts/diff-spec.ts                      | · | ·  | ·   | ·  | · | ·  |                                                      |
| scripts/generate-types.ts                 | · | ·  | ·   | ·  | · | ·  |                                                      |
| scripts/oauth-token.ts                    | · | ·  | ·   | ·  | · | ·  |                                                      |
| scripts/verify-endpoints.ts               | · | ·  | ·   | ·  | · | ·  |                                                      |
| src/client.ts                             | · | ·  | ✓   | ·  | ✗ | ·  | a1efe1a403b7d831, b0f2a062e828281a, 317f220ee8378e37 |
| src/errors.ts                             | · | ·  | ✓   | ·  | ✓ | ·  |                                                      |
| src/helpers/custom-fields.ts              | · | ·  | ✓   | ·  | ✓ | ·  |                                                      |
| src/index.ts                              | · | ·  | ✓   | ·  | ✓ | ·  |                                                      |
| src/oauth.ts                              | · | ·  | ✓   | ·  | ✓ | ·  |                                                      |
| src/paginator.ts                          | · | ·  | ✓   | ·  | ✗ | ·  | 315f1b37a6a17009                                     |
| src/resources/accounts.ts                 | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/activity-types.ts           | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/base.ts                     | · | ·  | ✓   | ·  | ✓ | ·  |                                                      |
| src/resources/bookkeeping-submissions.ts  | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/business-types.ts           | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/call-outcomes.ts            | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/calls.ts                    | · | ·  | ✓   | ·  | ✓ | ~  | f1e64031e524514a                                     |
| src/resources/closing-days.ts             | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/cloud-platforms.ts          | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/commercial-discounts.ts     | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/companies.ts                | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/contacts.ts                 | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/credit-notes.ts             | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/currencies.ts               | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/custom-field-definitions.ts | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/day-off-types.ts            | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/days-off.ts                 | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/deal-phases.ts              | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/deal-pipelines.ts           | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/deal-sources.ts             | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/deals.ts                    | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/departments.ts              | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/document-templates.ts       | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/email-tracking.ts           | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/events.ts                   | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/expenses.ts                 | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/external-parties.ts         | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/files.ts                    | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/incoming-credit-notes.ts    | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/incoming-invoices.ts        | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/invoices.ts                 | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/legacy-milestones.ts        | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/legacy-projects.ts          | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/level-two-areas.ts          | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/lost-reasons.ts             | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/mail-templates.ts           | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/meetings.ts                 | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/migrate.ts                  | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/notes.ts                    | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/orders.ts                   | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/payment-methods.ts          | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/payment-terms.ts            | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/plannable-items.ts          | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/price-lists.ts              | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/product-categories.ts       | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/products.ts                 | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/project-groups.ts           | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/project-lines.ts            | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/project-materials.ts        | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/project-tasks.ts            | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/projects.ts                 | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/quotations.ts               | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/receipts.ts                 | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/reservations.ts             | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/subscriptions.ts            | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/tags.ts                     | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/tasks.ts                    | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/tax-rates.ts                | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/teams.ts                    | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/ticket-status.ts            | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/tickets.ts                  | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/time-tracking.ts            | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/timers.ts                   | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/units-of-measure.ts         | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/user-availability.ts        | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/users.ts                    | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/webhooks.ts                 | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/withholding-tax-rates.ts    | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/resources/work-types.ts               | · | ·  | ✓   | ·  | ✓ | ✓  |                                                      |
| src/types/common.ts                       | · | ·  | ✓   | ·  | ✓ | ·  |                                                      |
| src/types/generated.ts                    | ✓ | ·  | ✓   | ·  | ✓ | ·  |                                                      |
| tsconfig.json                             | · | ·  | ·   | ·  | · | ·  |                                                      |
| vitest.config.ts                          | · | ·  | ·   | ·  | · | ·  |                                                      |
| vitest.integration.config.ts              | · | ·  | ·   | ·  | · | ·  |                                                      |

## Legend

- `✓` yes — file fully complies with the principle.
- `~` partial — file mostly complies but has one or more violations (see linked findings).
- `✗` no — file is in material violation of the principle (see linked findings).
- `·` n/a — the principle doesn't apply to this file (e.g., principle III multi-runtime portability doesn't apply to anything outside `src/`).

## Principles

- **I.   Spec-Generated Types** — only applies to `src/types/generated.ts` (must carry the auto-generation header; never hand-edited).
- **II.  Strict Semver Post-1.0** — release-level discipline; not per-file.
- **III. Multi-Runtime Portability** — applies to `src/**`; no `node:*` imports or Node-only globals.
- **IV.  Zero Runtime Dependencies** — applies to `package.json`; the `dependencies` object must be empty.
- **V.   Typed Errors** — applies to `src/**`; every `throw` must construct a `TeamleaderFocus*` subclass.
- **VI.  Live Integration Verification** — applies to `src/resources/*.ts`; every method must have a live integration test or a documented exemption.
