# Implementation Plan: SDK Quality & Consistency Audit

**Branch**: `001-sdk-quality-audit` | **Date**: 2026-05-19 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-sdk-quality-audit/spec.md`

## Summary

Build a reproducible audit pass that (a) generates a Compliance Report
mapping every audited file to the six constitution principles, (b)
generates a Consistency Matrix covering all 68 resources × their
methods × parameter shape × return envelope × error matrix, and
(c) produces a findings registry classifying each deviation as
`trivial` (fix in this PR) or `non-trivial` (file as remediation task
for the next MINOR or a v2.0.0 proposal). All three artifacts are
written as markdown for human review plus JSON sidecars for machine
diffing across runs.

**Technical approach** (from research, see `research.md`): all audit
logic lives in new `scripts/audit-*.ts` files orchestrated by
`scripts/audit.ts`, exposed via `npm run audit`. Static analysis uses
the TypeScript Compiler API already loaded by the `typescript`
devDep — the same approach `scripts/verify-endpoints.ts` already
uses for endpoint introspection. We reuse `verify:endpoints` directly
for FR-004 (live-coverage gap detection) and extend it to emit
structured JSON output that the audit orchestrator can consume. Zero
new runtime or dev dependencies are required.

## Technical Context

**Language/Version**: TypeScript 5.7 (matches `package.json` devDep);
the SDK source under audit targets `engines.node >= 18`.

**Primary Dependencies**: For audit tooling — TypeScript Compiler API
(`typescript@^5.7`, existing devDep), Vitest (`vitest@^4.1`, existing
devDep). Zero runtime deps under audit (constitution principle IV);
zero new devDeps for audit.

**Storage**: Filesystem. All artifacts written under
`specs/001-sdk-quality-audit/` as `*.md` (human-readable) and `*.json`
(machine-readable sidecars). No database, no external state store.

**Testing**: Vitest unit tests for each `scripts/audit-*.ts` module
under a new `tests/audit/` directory. Tests mock the filesystem (small
synthetic input trees) rather than running against the live SDK source,
so they stay fast and deterministic. The audit's *output* is verified
by snapshot-testing the rendered markdown + JSON.

**Target Platform**: Node ≥18 for audit scripts (per `package.json`
engines). Audit scripts may freely use Node-only APIs (`node:fs`,
`node:path`, `node:url`, `process`) — they live in `scripts/`, which
is exempt from constitution principle III (multi-runtime portability)
per the constitution's own carve-out.

**Project Type**: Library + internal tooling. Single project; existing
top-level layout. No new top-level directories.

**Performance Goals**: Full `npm run audit` end-to-end in under 30
minutes on a fresh checkout (SC-007). Static-analysis phase
(compliance + consistency matrix + docs cross-check) targets <2
minutes; live-coverage verification reuses existing `verify:endpoints`
performance characteristics; live integration test execution time is
governed by the existing test suite.

**Constraints**:
- Audit output MUST be byte-identical on the same SHA (FR-009): no
  timestamps in JSON, sorted object keys, content-derived finding IDs.
- Audit MUST NOT modify any `src/` file (no auto-arbitration of
  divergences per Q3 clarification; no signature changes per FR-010).
- Audit MUST be runnable without a Teamleader OAuth credential for
  the static-analysis portion; live-coverage verification requires
  the same `.env` the existing `test:integration` flow uses.

**Scale/Scope**: 68 resources × ~5–15 methods ≈ 470 method cells in
the consistency matrix. ~30 files under `src/` to compliance-check,
~7 files under `scripts/`, ~16 files under `tests/integration/`,
1 `README.md`, 1 `CHANGELOG.md`, ~4 files under `examples/`. Total
artifact size expected to stay under 200 KB across all .md+.json
files combined.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

*Source: `.specify/memory/constitution.md` (v1.0.0).*

- [x] **I. Spec-Generated Types**: This feature does NOT touch
  `src/types/generated.ts`. The audit reads generated types via the
  TypeScript Compiler API to introspect signatures, but never writes
  to them. **PASS.**
- [x] **II. Strict Semver Post-1.0**: Public-API impact = **PATCH**.
  The audit adds files under `scripts/` and `tests/audit/`, plus a
  new `audit` npm script in `package.json`. None of these are part of
  the SDK's published surface (`dist/`). No exported symbols added,
  changed, or removed. Target version bump for the release that
  contains this audit: **1.0.1** (PATCH). The audit may *propose*
  MINOR or MAJOR work as findings, but those are separate downstream
  releases. **PASS.**
- [x] **III. Multi-Runtime Portability**: No new code under `src/`.
  All new code lives in `scripts/` (Node-only, allowed) and
  `tests/audit/` (test scope, allowed). Imports listed: `node:fs`,
  `node:path`, `node:url`, `node:crypto`, `typescript`. All
  Node-only — but only in scope-exempt directories. **PASS.**
- [x] **IV. Zero Runtime Dependencies**: Zero new entries added to
  `dependencies`. Zero new entries added to `devDependencies` either
  — all needed capability already provided by `typescript` and
  `vitest`. **PASS.**
- [x] **V. Typed Errors**: This feature introduces no new failure
  modes on the SDK's public API. The audit scripts themselves can
  throw bare `Error` instances — they are tooling, not consumer
  surface, and `scripts/` is not subject to the typed-error rule.
  **PASS.**
- [x] **VI. Live Integration Verification**: This feature adds no new
  public methods to the SDK. It does, however, *verify* live coverage
  of existing methods (FR-004) by reusing `npm run verify:endpoints`.
  Any new live integration tests added to close audit-discovered
  coverage gaps land under `tests/integration/` per existing
  convention and count toward the existing per-method requirement,
  not a new one. **PASS.**

All six gates pass. **Complexity Tracking** stays empty (no justified
violations).

## Project Structure

### Documentation (this feature)

```text
specs/001-sdk-quality-audit/
├── plan.md                       # This file
├── research.md                   # Phase 0 output (created by /speckit-plan)
├── data-model.md                 # Phase 1 output (created by /speckit-plan)
├── quickstart.md                 # Phase 1 output (created by /speckit-plan)
├── contracts/
│   ├── findings.schema.json      # JSON Schema for findings.json
│   ├── compliance-report.schema.json
│   ├── consistency-matrix.schema.json
│   └── audit-cli.md              # npm-script command contracts
├── checklists/
│   └── requirements.md           # Spec quality checklist (already created)
├── tasks.md                      # Phase 2 output (created by /speckit-tasks)
│
└── (audit artifacts, populated by `npm run audit`):
    ├── compliance-report.md
    ├── compliance-report.json
    ├── consistency-matrix.md
    ├── consistency-matrix.json
    ├── findings.md
    └── findings.json
```

### Source Code (repository root)

The repo already follows a single-project layout. This feature adds
files inside existing directories, plus one new test subdirectory:

```text
scripts/
├── audit.ts                      # NEW: orchestrator; writes all artifacts
├── audit-compliance.ts           # NEW: constitution-principle compliance pass
├── audit-consistency.ts          # NEW: cross-resource consistency matrix + divergence findings
├── audit-docs.ts                 # NEW: README + examples cross-check
├── audit-changelog.ts            # NEW: CHANGELOG vs git log accuracy check
├── audit-lib/                    # NEW: shared utilities used by audit-*.ts
│   ├── ast.ts                    # NEW: TypeScript Compiler API helpers (extract methods, imports, throws)
│   ├── render.ts                 # NEW: markdown + JSON rendering with stable ordering
│   └── findings.ts               # NEW: finding-ID generation (content hash) + classification
├── verify-endpoints.ts           # EXISTING — extended to emit structured JSON
├── check-spec-update.ts          # EXISTING — unchanged
├── check-test-coverage.ts        # EXISTING — unchanged
├── diff-spec.ts                  # EXISTING — unchanged
├── generate-types.ts             # EXISTING — unchanged
└── oauth-token.ts                # EXISTING — unchanged

tests/
├── audit/                        # NEW: unit tests for audit scripts
│   ├── audit-compliance.test.ts
│   ├── audit-consistency.test.ts
│   ├── audit-docs.test.ts
│   ├── audit-changelog.test.ts
│   └── fixtures/                 # NEW: small synthetic input trees
└── (existing test files unchanged)

package.json                      # MODIFIED: add `"audit": "node --loader ts-node/esm scripts/audit.ts"` and `"audit:diff": "..."`
```

**Structure Decision**: Single project, existing layout. Audit lives
entirely under `scripts/` (orchestrator + per-domain modules + shared
`audit-lib/`) with unit tests under `tests/audit/`. No new top-level
directories. Audit artifacts live under the feature's spec directory
(`specs/001-sdk-quality-audit/`) so they're committed alongside the
PR that produced them and naturally version-controlled for cross-run
diffing per FR-009.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations. All six gates pass. Table intentionally empty.
