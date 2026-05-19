# Audit Findings

**Branch**: `001-sdk-quality-audit` · **SHA**: `7ee6e8fd63caca3e84cecb35d2561cefb0327cab`

Total findings: **2**

## consistency (2)

### medium

- **f0279509226fb8cb** `src/resources/` — return_envelope divergence on registerPayment: single (3) vs void (1) (**non-trivial**; task (major): Reviewer to pick canonical form (audit does not auto-arbitrate, per Q3). Variants: single=[incomingCreditNotes.registerPayment, incomingInvoices.registerPayment, receipts.registerPayment]; void=[invoices.registerPayment].)

### low

- **fe2697a2ca7daa80** `src/resources/` — method_name divergence on synonym-group:add/create/draft: add (9) vs create (19) vs draft (1) (**non-trivial**; task (major): Reviewer to pick canonical form (audit does not auto-arbitrate, per Q3). Variants: add=[calls.add, closingDays.add, companies.add, contacts.add, incomingCreditNotes.add, incomingInvoices.add, products.add, receipts.add, timeTracking.add]; create=[customFieldDefinitions.create, dayOffTypes.create, dealPhases.create, dealPipelines.create, deals.create, emailTracking.create, events.create, legacyMilestones.create, legacyProjects.create, notes.create, projectGroups.create, projectMaterials.create, projectTasks.create, projects.create, quotations.create, reservations.create, subscriptions.create, tasks.create, tickets.create]; draft=[invoices.draft].)
