# `custom_fields_update_strategy: "partial"` — Test Results

**Date:** 2026-02-14
**Test script:** `tests/live/custom-fields-partial-update.ts`
**Run command:** `npx tsx tests/live/custom-fields-partial-update.ts`

## Summary

The undocumented parameter `custom_fields_update_strategy: "partial"` is supported on **10 out of 11** tested resources. Only **tickets** silently ignores it.

This parameter is **not in the OpenAPI spec** and not in the SDK types. It must be sent via `client.request()` with `as any` or by extending the types.

## Results per resource

| Resource | API context | Partial works | Default = replace | Notes |
|---|---|---|---|---|
| contacts | `contact` | ✅ Yes | ✅ Yes | |
| companies | `company` | ✅ Yes | ✅ Yes | |
| deals | `sale` | ✅ Yes | ✅ Yes | Spec says `deal`, API wants `sale` (spec bug) |
| products | `product` | ✅ Yes | ✅ Yes | |
| invoices | `invoice` | ✅ Yes | ✅ Yes | Tested on draft invoices via `invoices.update` |
| subscriptions | `subscription` | ✅ Yes | ✅ Yes | |
| tickets | `ticket` | ❌ **No** | ✅ Yes | Parameter silently ignored |
| projects (v2) | `project` | ✅ Yes | ⚠️ No | Default also preserves fields (always partial-like) |
| meetings | `meeting` | ✅ Yes | ✅ Yes | |
| tasks | `todo` | ✅ Yes | ✅ Yes | Spec doesn't list `todo`, it's undocumented |
| calls | `callback` | ✅ Yes | ✅ Yes | Spec doesn't list `callback`, it's undocumented |

### How the test works

For each resource:
1. Create 2 custom field definitions (single_line) for the resource's context
2. Create a test entity
3. Set both fields A and B via `.update` with the full `custom_fields` array
4. Verify both fields are set via `.info`
5. **Partial test:** Update only field A with `custom_fields_update_strategy: "partial"`
6. Verify: field A changed, field B retained → **partial works**
7. **Control test:** Reset both fields, then update only field A **without** the strategy
8. Verify: field B is gone → **default replace behavior confirmed**

## Spec bugs / discrepancies

### `deal` vs `sale` — spec is wrong

The OpenAPI spec defines the context enum as:

```yaml
context:
  enum:
    - contact
    - company
    - deal      # <-- this is in the spec
    - project
    - milestone
    - product
    - invoice
    - subscription
    - ticket
```

But the live API **rejects** `deal` and only accepts `sale`:

```
context must be in `{ "contact", "company", "product", "project", "milestone", ... }`
```

Custom fields created with context `sale` correctly appear on deals. The Teamleader UI also uses `sale` internally. **The spec should say `sale` instead of `deal`.**

### Missing contexts in the spec

The following contexts are accepted by the API but **missing from the spec**:

| Context | Used by | In spec? |
|---|---|---|
| `sale` | deals | ❌ (spec says `deal`) |
| `todo` | tasks | ❌ |
| `callback` | calls | ❌ |
| `meeting` | meetings | ❌ |
| `meeting_report` | meeting reports | ❌ |
| `pro_external_cost` | orders / expenses | ❌ |
| `werkbonnen` | work orders | ❌ |

### Contexts that don't exist

These were tested and rejected by the API:

| Context | Error |
|---|---|
| `deal` | "context must be in ..." (use `sale` instead) |
| `task` | "context must be in ..." (use `todo` instead) |
| `call` | "context must be in ..." (use `callback` instead) |
| `work_order` | "context must be in ..." |
| `milestone` | "No access to custom field context" |

## Projects v2: special behavior

Projects v2 (`/projects-v2/projects.*`) behaves differently:
- **Partial works** ✅ — sending `custom_fields_update_strategy: "partial"` preserves unmentioned fields
- **Default also preserves** ⚠️ — even without the strategy parameter, unmentioned custom fields are NOT cleared
- This means projects v2 effectively **always** uses partial update semantics for custom fields
- The `includes=custom_fields` parameter is **not supported** on projects v2 `.info` — custom fields are always returned

## How to use partial updates in the SDK

Since `custom_fields_update_strategy` is not in the generated types, use `client.request()` directly:

```ts
await client.request("/contacts.update", {
  id: contactId,
  custom_fields: [{ id: fieldId, value: "new-value" }],
  custom_fields_update_strategy: "partial",
});
```

## All 14 valid custom field contexts

Confirmed working via `customFieldDefinitions.create`:

1. `contact` — contacts
2. `company` — companies
3. `sale` — deals
4. `product` — products
5. `invoice` — invoices
6. `subscription` — subscriptions
7. `ticket` — tickets
8. `project` — projects (v2)
9. `meeting` — meetings
10. `todo` — tasks
11. `callback` — calls
12. `meeting_report` — meeting reports (no own CRUD resource)
13. `pro_external_cost` — orders / expenses (no `.update` with custom_fields)
14. `werkbonnen` — work orders (no CRUD resource)
