# Audit Findings

**Branch**: `001-sdk-quality-audit` · **SHA**: `a1977b39570b3364d75f1eb6cdb220f69e663daa`

Total findings: **3**

## consistency (3)

### medium

- **93f5f2e8211ae060** `src/resources/` — param_shape divergence on list: RequestBody<"<endpoint>"> (56) vs undefined (1) (**non-trivial**; task (major): Reviewer to pick canonical form (audit does not auto-arbitrate, per Q3). Variants: RequestBody<"<endpoint>">=[activityTypes.list, bookkeepingSubmissions.list, businessTypes.list, callOutcomes.list, calls.list, closingDays.list, commercialDiscounts.list, companies.list, contacts.list, creditNotes.list, customFieldDefinitions.list, dealPhases.list, dealPipelines.list, dealSources.list, deals.list, departments.list, documentTemplates.list, emailTracking.list, events.list, expenses.list, files.list, invoices.list, legacyMilestones.list, legacyProjects.list, levelTwoAreas.list, lostReasons.list, mailTemplates.list, meetings.list, notes.list, orders.list, paymentMethods.list, paymentTerms.list, plannableItems.list, priceLists.list, productCategories.list, products.list, projectGroups.list, projectLines.list, projectMaterials.list, projectTasks.list, projects.list, quotations.list, reservations.list, subscriptions.list, tags.list, tasks.list, taxRates.list, teams.list, ticketStatus.list, tickets.list, timeTracking.list, unitsOfMeasure.list, users.list, webhooks.list, withholdingTaxRates.list, workTypes.list]; undefined=[dayOffTypes.list].)
- **f0279509226fb8cb** `src/resources/` — return_envelope divergence on registerPayment: single (3) vs void (1) (**non-trivial**; task (major): Reviewer to pick canonical form (audit does not auto-arbitrate, per Q3). Variants: single=[incomingCreditNotes.registerPayment, incomingInvoices.registerPayment, receipts.registerPayment]; void=[invoices.registerPayment].)

### low

- **fe2697a2ca7daa80** `src/resources/` — method_name divergence on synonym-group:add/create/draft: add (9) vs create (19) vs draft (1) (**non-trivial**; task (major): Reviewer to pick canonical form (audit does not auto-arbitrate, per Q3). Variants: add=[calls.add, closingDays.add, companies.add, contacts.add, incomingCreditNotes.add, incomingInvoices.add, products.add, receipts.add, timeTracking.add]; create=[customFieldDefinitions.create, dayOffTypes.create, dealPhases.create, dealPipelines.create, deals.create, emailTracking.create, events.create, legacyMilestones.create, legacyProjects.create, notes.create, projectGroups.create, projectMaterials.create, projectTasks.create, projects.create, quotations.create, reservations.create, subscriptions.create, tasks.create, tickets.create]; draft=[invoices.draft].)
