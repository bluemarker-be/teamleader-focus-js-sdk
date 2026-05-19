# Audit Findings

**Branch**: `001-sdk-quality-audit` · **SHA**: `b8ed99f4ecd0db07a144ddae9f488cb94d71412c`

Total findings: **26**

## consistency (3)

### medium

- **93f5f2e8211ae060** `src/resources/` — param_shape divergence on list: RequestBody<"<endpoint>"> (56) vs undefined (1) (**non-trivial**; task (major): Reviewer to pick canonical form (audit does not auto-arbitrate, per Q3). Variants: RequestBody<"<endpoint>">=[activityTypes.list, bookkeepingSubmissions.list, businessTypes.list, callOutcomes.list, calls.list, closingDays.list, commercialDiscounts.list, companies.list, contacts.list, creditNotes.list, customFieldDefinitions.list, dealPhases.list, dealPipelines.list, dealSources.list, deals.list, departments.list, documentTemplates.list, emailTracking.list, events.list, expenses.list, files.list, invoices.list, legacyMilestones.list, legacyProjects.list, levelTwoAreas.list, lostReasons.list, mailTemplates.list, meetings.list, notes.list, orders.list, paymentMethods.list, paymentTerms.list, plannableItems.list, priceLists.list, productCategories.list, products.list, projectGroups.list, projectLines.list, projectMaterials.list, projectTasks.list, projects.list, quotations.list, reservations.list, subscriptions.list, tags.list, tasks.list, taxRates.list, teams.list, ticketStatus.list, tickets.list, timeTracking.list, unitsOfMeasure.list, users.list, webhooks.list, withholdingTaxRates.list, workTypes.list]; undefined=[dayOffTypes.list].)
- **f0279509226fb8cb** `src/resources/` — return_envelope divergence on registerPayment: single (3) vs void (1) (**non-trivial**; task (major): Reviewer to pick canonical form (audit does not auto-arbitrate, per Q3). Variants: single=[incomingCreditNotes.registerPayment, incomingInvoices.registerPayment, receipts.registerPayment]; void=[invoices.registerPayment].)

### low

- **fe2697a2ca7daa80** `src/resources/` — method_name divergence on synonym-group:add/create/draft: add (9) vs create (19) vs draft (1) (**non-trivial**; task (major): Reviewer to pick canonical form (audit does not auto-arbitrate, per Q3). Variants: add=[calls.add, closingDays.add, companies.add, contacts.add, incomingCreditNotes.add, incomingInvoices.add, products.add, receipts.add, timeTracking.add]; create=[customFieldDefinitions.create, dayOffTypes.create, dealPhases.create, dealPipelines.create, deals.create, emailTracking.create, events.create, legacyMilestones.create, legacyProjects.create, notes.create, projectGroups.create, projectMaterials.create, projectTasks.create, projects.create, quotations.create, reservations.create, subscriptions.create, tasks.create, tickets.create]; draft=[invoices.draft].)

## principle-compliance (4)

### medium

- **315f1b37a6a17009** `src/paginator.ts:45` — Bare `throw new Error(...)` — should construct a TeamleaderFocus* subclass (**non-trivial**; task (minor): Replace with the appropriate TeamleaderFocus* subclass so consumers can pattern-match on error identity (constitution principle V).)
- **317f220ee8378e37** `src/client.ts:497` — Bare `throw new Error(...)` — should construct a TeamleaderFocus* subclass (**non-trivial**; task (minor): Replace with the appropriate TeamleaderFocus* subclass so consumers can pattern-match on error identity (constitution principle V).)
- **a1efe1a403b7d831** `src/client.ts:421` — Bare `throw new Error(...)` — should construct a TeamleaderFocus* subclass (**non-trivial**; task (minor): Replace with the appropriate TeamleaderFocus* subclass so consumers can pattern-match on error identity (constitution principle V).)
- **b0f2a062e828281a** `src/client.ts:454` — Bare `throw new Error(...)` — should construct a TeamleaderFocus* subclass (**non-trivial**; task (minor): Replace with the appropriate TeamleaderFocus* subclass so consumers can pattern-match on error identity (constitution principle V).)

## documentation (14)

### high

- **2acdf0c355e7a98d** `README.md` — README lists `dealPhases.duplicate` but it doesn't exist on the resource (**non-trivial**; task (patch): Remove the stale README entry, or restore the documented symbol if it was removed unintentionally.)

### medium

- **0e319eb91a432b26** `README.md` — `incomingCreditNotes.removePayment` exists but isn't listed in the README Resources table (**non-trivial**; task (patch): Add the missing entry to the README Resources table (or document the omission in the snippet's surrounding text if it's intentional).)
- **168d3a1e57b03e67** `README.md` — `incomingInvoices.registerPayment` exists but isn't listed in the README Resources table (**non-trivial**; task (patch): Add the missing entry to the README Resources table (or document the omission in the snippet's surrounding text if it's intentional).)
- **261646c76069a5e0** `README.md` — `calls.delete` exists but isn't listed in the README Resources table (**non-trivial**; task (patch): Add the missing entry to the README Resources table (or document the omission in the snippet's surrounding text if it's intentional).)
- **678ed78675da556a** `README.md` — `incomingInvoices.listPayments` exists but isn't listed in the README Resources table (**non-trivial**; task (patch): Add the missing entry to the README Resources table (or document the omission in the snippet's surrounding text if it's intentional).)
- **6efa01535564b88f** `README.md` — `incomingInvoices.updatePayment` exists but isn't listed in the README Resources table (**non-trivial**; task (patch): Add the missing entry to the README Resources table (or document the omission in the snippet's surrounding text if it's intentional).)
- **770227a877ca7f99** `README.md` — `receipts.updatePayment` exists but isn't listed in the README Resources table (**non-trivial**; task (patch): Add the missing entry to the README Resources table (or document the omission in the snippet's surrounding text if it's intentional).)
- **808340bd160169a2** `README.md` — `incomingInvoices.removePayment` exists but isn't listed in the README Resources table (**non-trivial**; task (patch): Add the missing entry to the README Resources table (or document the omission in the snippet's surrounding text if it's intentional).)
- **868f40d1cdd15c2e** `README.md` — `incomingCreditNotes.registerPayment` exists but isn't listed in the README Resources table (**non-trivial**; task (patch): Add the missing entry to the README Resources table (or document the omission in the snippet's surrounding text if it's intentional).)
- **a6c8747695c30c3d** `README.md` — `receipts.registerPayment` exists but isn't listed in the README Resources table (**non-trivial**; task (patch): Add the missing entry to the README Resources table (or document the omission in the snippet's surrounding text if it's intentional).)
- **b454277a9925b8b6** `README.md` — `incomingCreditNotes.updatePayment` exists but isn't listed in the README Resources table (**non-trivial**; task (patch): Add the missing entry to the README Resources table (or document the omission in the snippet's surrounding text if it's intentional).)
- **be9a593870309b0f** `README.md` — `incomingCreditNotes.listPayments` exists but isn't listed in the README Resources table (**non-trivial**; task (patch): Add the missing entry to the README Resources table (or document the omission in the snippet's surrounding text if it's intentional).)
- **cb90c9cab059b4fb** `README.md` — `receipts.listPayments` exists but isn't listed in the README Resources table (**non-trivial**; task (patch): Add the missing entry to the README Resources table (or document the omission in the snippet's surrounding text if it's intentional).)
- **d1f8e01f956e3c57** `README.md` — `receipts.removePayment` exists but isn't listed in the README Resources table (**non-trivial**; task (patch): Add the missing entry to the README Resources table (or document the omission in the snippet's surrounding text if it's intentional).)

## changelog (5)

### medium

- **13a5c3c5f237d98a** `CHANGELOG.md:283` — CHANGELOG declares `[0.1.0]` but no matching git tag `v0.1.0` exists (**non-trivial**; task (none): Add the missing git tag (`git tag vX.Y.Z <commit-sha>` for the release commit), or remove the CHANGELOG entry if the release was never shipped.)
- **7cf4660a14f7693a** `CHANGELOG.md:255` — CHANGELOG declares `[0.2.0]` but no matching git tag `v0.2.0` exists (**non-trivial**; task (none): Add the missing git tag (`git tag vX.Y.Z <commit-sha>` for the release commit), or remove the CHANGELOG entry if the release was never shipped.)
- **bc8e9cfac0fdc4fd** `CHANGELOG.md:229` — CHANGELOG declares `[0.3.0]` but no matching git tag `v0.3.0` exists (**non-trivial**; task (none): Add the missing git tag (`git tag vX.Y.Z <commit-sha>` for the release commit), or remove the CHANGELOG entry if the release was never shipped.)
- **c2cbfc0af94738ec** `CHANGELOG.md:296` — CHANGELOG declares `[0.0.1]` but no matching git tag `v0.0.1` exists (**non-trivial**; task (none): Add the missing git tag (`git tag vX.Y.Z <commit-sha>` for the release commit), or remove the CHANGELOG entry if the release was never shipped.)
- **fc3e8d787a2bbfc7** `CHANGELOG.md:274` — CHANGELOG declares `[0.1.1]` but no matching git tag `v0.1.1` exists (**non-trivial**; task (none): Add the missing git tag (`git tag vX.Y.Z <commit-sha>` for the release commit), or remove the CHANGELOG entry if the release was never shipped.)
