# Data Model: SDK Quality & Consistency Audit

**Phase**: 1 (Design & Contracts)
**Feature**: [spec.md](./spec.md) · **Plan**: [plan.md](./plan.md)

This document defines the four entities the audit produces and the
relationships between them. Field-level JSON schemas are in
[`contracts/`](./contracts/); this doc describes the *semantics* —
what each field means, what values are valid, and how the entities
relate.

---

## Entity: Audit Finding

The atomic unit of the audit. One finding = one deviation observed
in the audited surface. Findings populate `findings.json` and are
rendered into `findings.md`, grouped by category and severity.

| Field | Type | Description |
|---|---|---|
| `id` | string | 16-char lowercase hex (SHA-256 truncated). Content-derived from `category \| file \| principle \| location \| message` — stable within one audit run on one SHA; not stable across runs at different SHAs. See research Decision 3. |
| `category` | enum | One of: `"consistency"`, `"principle-compliance"`, `"documentation"`, `"changelog"`. |
| `principle` | enum or null | One of `"I"`–`"VI"` when `category` is `"principle-compliance"`; `null` otherwise. Identifies which constitution principle was violated. |
| `location.file` | string | POSIX-style repo-relative path (e.g. `src/resources/contacts.ts`). |
| `location.start_line` | integer | 1-indexed start line. `0` for file-level findings (e.g. file is missing). |
| `location.end_line` | integer | 1-indexed end line (inclusive). Equals `start_line` for single-line findings. |
| `severity` | enum | One of: `"low"`, `"medium"`, `"high"`. Default mapping: principle violations and broken doc snippets → `high`; missing live-coverage → `medium`; stylistic divergences with no behavior impact → `low`. |
| `classification` | enum | One of: `"trivial"`, `"non-trivial"`. Per FR-008: `trivial` = single file, no public-API surface change, no behavior change observable to a caller. Drives whether the fix lands in this PR or as a remediation task. |
| `message` | string | One-sentence human-readable summary. Goes into both `findings.md` (visible) and the `id` hash (so editing the message changes the ID, which is correct — a reworded finding is a different finding for diff purposes). |
| `details` | string or null | Multi-paragraph markdown for cases that need more than a sentence (e.g. a divergence cluster with multiple variants). Optional. |
| `remediation` | object | Either `{ "kind": "in-pr", "description": "..." }` for trivial fixes done in this PR, or `{ "kind": "task", "proposed_approach": "...", "version_impact": "patch" \| "minor" \| "major" \| "none" }` for non-trivial findings deferred as remediation tasks. |
| `variants` | array or null | Only populated for `category: "consistency"` findings: the list of variant names observed (e.g. `["add", "create"]`), each with `{ "name", "occurrence_count", "resources": [...]" }`. Used by reviewers to pick a canonical form per Q3. |

**Lifecycle**: A finding exists only within one audit run. Re-runs at
the same SHA regenerate identical findings (same content → same `id`);
re-runs at a different SHA generate a fresh set whose intersection
with the prior set is computable via `npm run audit:diff`.

**Identity**: `id` uniquely identifies the finding *within one run*.
Across runs, two findings with the same `id` represent the same
underlying issue iff the source code, location, category, and
principle have all remained identical — which is exactly what we
want for diff semantics.

## Entity: Compliance Report

A per-file × per-principle grid. One row per audited file; one column
per constitution principle (I–VI). Each cell is a compliance verdict.

| Field | Type | Description |
|---|---|---|
| `sha` | string | Full git SHA the audit ran against. |
| `generated_for_branch` | string | Branch name at audit time (e.g. `001-sdk-quality-audit`). |
| `rows` | array | One entry per audited file. |
| `rows[].file` | string | POSIX-style repo-relative path. |
| `rows[].cells` | object | Keys = principle Roman numerals (`"I"`–`"VI"`). Values = `"yes"`, `"partial"`, `"no"`, or `"n/a"`. |
| `rows[].finding_ids` | array of string | IDs of findings that explain any `partial` or `no` cell in this row. Empty if all cells are `yes` or `n/a`. |

**Semantics**:
- `yes` = file fully complies with the principle. No finding required.
- `partial` = file mostly complies but has at least one violation;
  every violation is recorded as a separate Audit Finding linked via
  `finding_ids`.
- `no` = file is in material violation of the principle. Same linkage
  rule.
- `n/a` = the principle doesn't apply to this file (e.g. principle
  III multi-runtime portability doesn't apply to anything in
  `scripts/`).

**Invariants**:
- Every row has exactly six cells (one per principle).
- Every `partial` or `no` cell MUST have at least one corresponding
  finding in `finding_ids`.
- Rows are sorted by `file` alphabetically (stability per research
  Decision 2).

## Entity: Consistency Matrix

A per-resource × per-method × per-attribute structure. The shape is
optimized for divergence detection rather than for direct rendering:
the markdown rendering pivots it into one table per attribute
(method-name presence, parameter shape, return envelope, error
matrix).

| Field | Type | Description |
|---|---|---|
| `sha` | string | Full git SHA. |
| `resources` | array | One entry per resource exposed on `TeamleaderFocusClient`. |
| `resources[].name` | string | Camel-case resource name as exposed on the client (e.g. `"contacts"`, `"customFieldDefinitions"`). |
| `resources[].class_name` | string | Resource class name (e.g. `"ContactsResource"`). |
| `resources[].file` | string | POSIX-style path to the resource module (e.g. `src/resources/contacts.ts`). |
| `resources[].methods` | array | One entry per method. |
| `resources[].methods[].name` | string | Method name as exposed (e.g. `"add"`, `"list"`, `"sendViaPeppol"`). |
| `resources[].methods[].endpoint` | string | Underlying Teamleader endpoint (e.g. `"/contacts.add"`). |
| `resources[].methods[].param_shape` | string | Canonical fingerprint of the parameter type. For most methods this is `RequestBody<"endpoint.name">`; for special cases (e.g. `customField()`), the resolved shape. |
| `resources[].methods[].return_envelope` | enum | One of: `"single"` (`{ data: T }`), `"iterable"` (auto-paginating `AsyncIterable<T>`), `"void"`, `"binary"` (e.g. `.download()`), `"other"`. |
| `resources[].methods[].errors` | array of string | Names of `TeamleaderFocusError` subclasses this method's `client.request()` path may throw (statically derived from the client's error matrix; identical for almost all methods, but tracked per-method for completeness). |
| `divergence_clusters` | array | Findings derived from the matrix — one entry per detected cross-resource divergence (e.g. `add` vs. `create`). |
| `divergence_clusters[].attribute` | enum | What kind of divergence: `"method_name"`, `"param_shape"`, `"return_envelope"`. |
| `divergence_clusters[].variants` | array | Each variant: `{ "value", "occurrence_count", "resources_methods": [...]}` — the value is the variant (e.g. `"add"`), the count is how many `(resource, method)` pairs use it, and the list is the actual pairs. |
| `divergence_clusters[].finding_id` | string | The Audit Finding ID this divergence cluster produced. |

**Invariants**:
- `resources` is sorted alphabetically by `name`.
- Each `resource.methods` array is sorted alphabetically by `name`.
- `divergence_clusters` is sorted by `attribute` then by the first
  variant's `value`.
- Every `divergence_cluster` MUST have a corresponding finding in
  `findings.json` with matching `id`.

## Entity: Remediation Task

A non-trivial finding (per FR-008) lifted out of `findings.json` and
shaped for `/speckit-tasks` consumption. Remediation Tasks aren't a
separate artifact file — they're populated into `tasks.md` by the
`/speckit-tasks` step, with each task linking back to its source
finding's `id`. The schema here exists so that link is meaningful.

| Field | Type | Description |
|---|---|---|
| `task_id` | string | Spec-Kit task identifier (e.g. `T042`). Assigned by `/speckit-tasks`. |
| `finding_id` | string | ID of the source Audit Finding. |
| `proposed_approach` | string | Markdown body describing the fix. Copied from the source finding's `remediation.proposed_approach`. |
| `version_impact` | enum | `"patch"`, `"minor"`, `"major"`, or `"none"`. Copied from the source finding's `remediation.version_impact`. |
| `acceptance_criteria` | string | Markdown bullets. Derived from the finding's `details` plus the linked Acceptance Scenarios in `spec.md` where applicable. |

**Lifecycle**: Created by `/speckit-tasks` from `findings.json` entries
with `classification: "non-trivial"`. Removed from `tasks.md` only
when its underlying finding no longer appears in the latest audit run
(implying the issue was resolved upstream).

---

## Cross-entity relationships

```
Audit Finding ──┬── referenced by ──> Compliance Report row.finding_ids
                ├── referenced by ──> Consistency Matrix divergence_cluster.finding_id
                └── lifted into  ──> Remediation Task (when classification = non-trivial)

Compliance Report ──> aggregates per-file principle verdicts; explains "no"/"partial" via finding linkage.

Consistency Matrix ──> aggregates per-method observations; produces divergence_clusters that each become a finding.

Remediation Task ──> derived view of non-trivial findings, owned by /speckit-tasks workflow.
```

A finding is always the leaf entity. The Compliance Report and
Consistency Matrix are aggregations; the Remediation Task is a
projection. This keeps the data model acyclic and the
`audit-diff` semantics simple (diffing two `findings.json` files
captures every meaningful change; the other artifacts are
regenerable views of the same data).
