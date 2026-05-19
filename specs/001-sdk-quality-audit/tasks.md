---
description: "Task list for SDK Quality & Consistency Audit"
---

# Tasks: SDK Quality & Consistency Audit

**Input**: Design documents from `/specs/001-sdk-quality-audit/`

**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, contracts/ ✓, quickstart.md ✓

**Tests**: Included. `plan.md` mandates Vitest unit tests for each `scripts/audit-*.ts` module under `tests/audit/` with synthetic fixtures; these are regression tests (not TDD) that lock module behavior and validate FR-009 reproducibility.

**Organization**: Tasks are grouped by user story so each story can be implemented and tested independently after the foundational phase.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no incomplete dependencies)
- **[Story]**: Which user story this task belongs to (US1 / US2 / US3)
- Setup, Foundational, Cross-cutting, and Polish phases carry no `[Story]` label

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Register the audit's entry points so per-module work can run end-to-end via `npm run`.

- [ ] T001 Add `"audit"` and `"audit:diff"` script entries to `package.json` per `contracts/audit-cli.md` (`audit` → `node --loader ts-node/esm scripts/audit.ts`; `audit:diff` → `node --loader ts-node/esm scripts/audit-diff.ts`). Verify Vitest's default `**/*.test.ts` discovery already covers `tests/audit/` (no `vitest.config.ts` change expected — confirm by inspection).

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared library (`scripts/audit-lib/`) plus the orchestrator skeleton. Every per-story module depends on the types and helpers built here.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T002 Create `scripts/audit-lib/types.ts` with TypeScript `interface`s mirroring the three JSON Schemas in `specs/001-sdk-quality-audit/contracts/`: `Finding` (matches `findings.schema.json`), `ComplianceReport` + `ComplianceRow` + `Verdict` (matches `compliance-report.schema.json`), `ConsistencyMatrix` + `ResourceObservation` + `MethodObservation` + `DivergenceCluster` (matches `consistency-matrix.schema.json`). Export discriminated unions for `Remediation` (`{kind: "in-pr", ...} | {kind: "task", ...}`).
- [ ] T003 [P] Create `scripts/audit-lib/render.ts` exporting (a) `stableStringify(value): string` — JSON.stringify replacement that sorts object keys recursively, ensuring byte-identical output for equal inputs (research Decision 2), (b) `toPosixPath(absPath, repoRoot): string` — Node-OS-independent POSIX-style repo-relative path normalizer, (c) `mdTable(headers, rows): string` — markdown table renderer with consistent cell padding.
- [ ] T004 [P] Create `scripts/audit-lib/findings.ts` exporting (a) `computeFindingId(f: Pick<Finding, "category" | "principle" | "location" | "message">): string` — SHA-256 of canonical fingerprint string `${category}|${file}|${principle ?? "-"}|${start}-${end}|${message}`, truncated to 16 hex chars (research Decision 3), (b) `classifyFinding(f): "trivial" | "non-trivial"` — codifies FR-008 rules (single-file + no API-surface change + no behavior change → trivial; else non-trivial).
- [ ] T005 [P] Create `scripts/audit-lib/ast.ts` exporting Compiler API helpers used by every audit module: (a) `loadProgram(tsconfigPath): ts.Program`, (b) `getResourceClasses(program): Array<{ className, fileName, methods: Array<{ name, endpoint, paramShape, returnEnvelope, errors, jsDoc }>}>` — walks `src/resources/*.ts` extracting one entry per `Resource` class, with each method introspected for endpoint URL (from `client.request("/x.y", ...)` first arg), parameter shape (from `RequestBody<"x.y">` generic), return envelope (`single` / `iterable` / `void` / `binary` from return type analysis), error matrix (from client.request's declared throws), (c) `getImports(sourceFile): Array<{ module, kind }>` — for principle III, (d) `getThrowSites(sourceFile): Array<{ ctorClassName, line }>` — for principle V.
- [ ] T006 Create `scripts/audit.ts` orchestrator skeleton: CLI parser (matches `contracts/audit-cli.md` exactly — flags `--only`, `--fail-on`, `--quiet`, `--help`), module dispatch table (currently stubs `runConsistency()`, `runCompliance()`, `runDocs()`, `runChangelog()` each returning `{ findings: [], artifact: null }`), aggregation step that combines all stubs' findings into a single `findings.{md,json}` pair using `audit-lib/render.ts`. Exit codes per contract. Depends on T002 (types) but not T003–T005 (which provide implementations, not interfaces).

**Checkpoint**: Foundation ready. `npm run audit` runs end-to-end and produces empty (but well-formed) `findings.{md,json}`. User-story implementation can now begin in parallel.

---

## Phase 3: User Story 1 — Cross-resource surface consistency (Priority: P1) 🎯 MVP

**Goal**: Surface every cross-resource divergence (method names, parameter shapes, return envelopes) across all 68 resources with full context so a reviewer can decide per cluster. The audit produces `consistency-matrix.{md,json}` and contributes findings to `findings.{md,json}`. No auto-arbitration (per Q3 clarification).

**Independent Test**: Run `npm run audit -- --only=consistency` on this repo; verify `consistency-matrix.md` lists every resource × method, `consistency-matrix.json` validates against `contracts/consistency-matrix.schema.json`, and at least the known `add`-vs-`create` divergence (companies/contacts/calls/projects use `add`; subscriptions/quotations use `create`) appears as a `divergence_cluster` with both variants and their resource lists.

### Tests for User Story 1

- [ ] T007 [P] [US1] Create `tests/audit/fixtures/consistency/` with two synthetic resource files (`good-resource.ts`, `divergent-resource.ts`) that together exercise (a) consistent method naming, (b) a method-name divergence (`add` vs. `create`), (c) a parameter-shape divergence, (d) a return-envelope divergence. Tiny fixtures (~20 lines each).
- [ ] T008 [P] [US1] Implement `tests/audit/audit-consistency.test.ts` — Vitest spec that loads the fixtures, calls the consistency module's `runConsistency(programOpts)` entry, and asserts: (1) JSON output validates against `consistency-matrix.schema.json` (use a tiny ad-hoc validator, no devDep), (2) every expected divergence appears as a `divergence_cluster` with correct `attribute` and variants, (3) re-running on identical input produces byte-identical JSON (snapshot test using `stableStringify`).

### Implementation for User Story 1

- [ ] T009 [US1] Implement `scripts/audit-consistency.ts` exporting `runConsistency(opts): Promise<{ findings: Finding[]; artifact: ConsistencyMatrix }>`: (1) use `ast.ts::getResourceClasses(program)` to introspect all `src/resources/*.ts`, (2) build the `ConsistencyMatrix` per `data-model.md`, (3) group methods by name across resources; for each method name appearing on ≥2 resources, compare parameter shape and return envelope; emit a `DivergenceCluster` for every group with ≥2 variants on any attribute, (4) emit one `Finding` per cluster with `category: "consistency"`, `severity: "low"` (cosmetic) or `"medium"` (behavioral) by attribute kind, `classification: "non-trivial"` (every rename is MAJOR per constitution II), `variants` populated, `remediation: { kind: "task", proposed_approach: "Reviewer to pick canonical form per Q3 clarification", version_impact: "major" }`.
- [ ] T010 [US1] Implement markdown rendering for `consistency-matrix.md` inside `scripts/audit-consistency.ts` (or a co-located `audit-consistency-render.ts` if size warrants): one summary table (resources × method-presence grid), one section per detected divergence cluster (variant table + affected resources), commit-ready human-readable layout. Wire `audit.ts` orchestrator's stub for `runConsistency` to call the real implementation.

**Checkpoint**: US1 is fully functional and testable independently. `npm run audit -- --only=consistency` writes both artifacts and surfaces real divergences in this codebase.

---

## Phase 4: User Story 2 — Constitution-principle compliance (Priority: P2)

**Goal**: Per-file × per-principle compliance grid across `src/`, `scripts/`, and the project config set; every `partial`/`no` cell linked to one or more findings explaining it. Live-coverage (principle VI) reuses existing `verify-endpoints.ts`.

**Independent Test**: Run `npm run audit -- --only=compliance` on this repo; verify `compliance-report.md` has one row per audited file, six columns (I–VI), every cell populated, and any `no`/`partial` cells link to corresponding `findings.json` entries with `category: "principle-compliance"` and the matching `principle` field.

### Tests for User Story 2

- [ ] T011 [P] [US2] Create `tests/audit/fixtures/compliance/` with synthetic files designed to trigger one violation per principle: (a) a file with a hand-edit to a `generated.ts`-like stub (I), (b) `package.json` snippet with a non-empty `dependencies` field (IV), (c) a `src/`-positioned file importing `node:fs` (III), (d) a file throwing a bare `new Error()` on a public path (V), (e) a method declared without a matching live integration test (VI), and a corresponding compliant control file for each.
- [ ] T012 [P] [US2] Implement `tests/audit/audit-compliance.test.ts` — assert (1) every fixture file gets six populated cells, (2) each principle-specific violation produces the expected verdict on the expected cell, (3) `verify-endpoints.ts --json` integration point is mocked at the subprocess boundary so the test is hermetic, (4) byte-identical output on re-run.

### Implementation for User Story 2

- [ ] T013 [P] [US2] Extend `scripts/verify-endpoints.ts` to accept a `--json` flag (research Decision 6) — when present, emit a `{ schema_version: "1", missing_coverage: [{ endpoint, resource, method, exempted, exemption_reason? }], ... }` payload to stdout INSTEAD of the human report (the existing default stdout behavior stays for unflagged invocations). The exempted set continues to come from the existing `INTENTIONALLY_SKIPPED` map. No new dependency; use `JSON.stringify` with the `stableStringify` from `audit-lib/render.ts`.
- [ ] T014 [US2] Implement `scripts/audit-compliance.ts` exporting `runCompliance(opts): Promise<{ findings: Finding[]; artifact: ComplianceReport }>`: (1) enumerate audited files per the in-scope list in `plan.md` (`src/**`, `scripts/**`, `tests/**`, `package.json`, `tsconfig.json`, `vitest*.config.ts`), (2) for each file evaluate each of the six principles producing `yes`/`partial`/`no`/`n/a`, using helpers from `audit-lib/ast.ts` (principle III via `getImports` filtering for `node:*`; principle V via `getThrowSites` filtering for non-`TeamleaderFocus*` constructors on public paths), JSON parse for principle IV (`dependencies` emptiness in `package.json`), file-name match for principle I (`src/types/generated.ts` git-blame fence — flag if recent commits modified it without a matching `npm run generate` invocation), (3) for principle VI, invoke the extended `scripts/verify-endpoints.ts --json` as a subprocess (T013), parse its JSON output, and generate one `Finding` per non-exempt missing-coverage entry.
- [ ] T015 [US2] Implement markdown rendering for `compliance-report.md` (grid: rows = files, columns I–VI, cell content = verdict + finding-ID footnotes). Wire orchestrator's stub for `runCompliance` to call the real implementation.

**Checkpoint**: US1 + US2 both work independently. The audit can produce a real Compliance Report and Consistency Matrix for this codebase.

---

## Phase 5: User Story 3 — Documentation & changelog accuracy (Priority: P3)

**Goal**: Cross-check `README.md` and `examples/` against the SDK's actual exports; cross-check `CHANGELOG.md` entries against the git history between consecutive tags. Two distinct modules (docs / changelog) that can be implemented in parallel.

**Independent Test**: Run `npm run audit -- --only=docs`; verify findings flag any documented-but-absent symbol, any failing snippet type-check, and any drift between `README.md` resource table and the introspected resource set. Then run `npm run audit -- --only=changelog`; verify findings flag any inaccurate or missing entry for at least the last three released tags (`v1.0.0`, `v0.7.0`, `v0.6.0`).

### Tests for User Story 3

- [ ] T016 [P] [US3] Create `tests/audit/fixtures/docs/` with a synthetic mini-README containing (a) a valid resource table, (b) a documented method that doesn't exist on any resource, (c) an undocumented resource that does exist, (d) one passing typescript snippet, (e) one failing typescript snippet (uses wrong parameter shape).
- [ ] T017 [P] [US3] Implement `tests/audit/audit-docs.test.ts` against the T016 fixtures: assert each expected discrepancy produces the corresponding finding category.
- [ ] T018 [P] [US3] Create `tests/audit/fixtures/changelog/` with (a) a synthetic git-log-style fixture file (records of commits with `--name-only` output between two mock tags), (b) a synthetic `CHANGELOG.md` whose entry for the later tag (i) over-claims one addition and (ii) under-documents one real public-symbol change. The fixture loader pattern lets the test bypass real `git` invocation entirely — keeps tests hermetic.
- [ ] T019 [P] [US3] Implement `tests/audit/audit-changelog.test.ts` against the T018 fixtures: assert the over-claim is flagged as `documented-but-not-in-diff`, the under-documentation as `in-diff-but-not-documented`.

### Implementation for User Story 3

- [ ] T020 [P] [US3] Implement `scripts/audit-docs.ts` exporting `runDocs(opts): Promise<{ findings: Finding[]; artifact: null }>`: (1) parse the `## Resources` table out of `README.md` using a small inline markdown-table parser (research Decision 4) into `Set<resource.method>`, (2) introspect actual client exports via `audit-lib/ast.ts::getResourceClasses(program)` for the diff, (3) extract every fenced ```typescript / ```ts code block from `README.md`; for each, write to a temp directory, invoke `ts.createProgram` with the SDK's `.d.ts` files in scope, collect `ts.getPreEmitDiagnostics(...)`; same approach for every file under `examples/`. Emit findings: `category: "documentation"`, severity `high` for broken snippets and missing-from-README resources, `medium` for documented-but-absent, classification per FR-008.
- [ ] T021 [P] [US3] Implement `scripts/audit-changelog.ts` exporting `runChangelog(opts): Promise<{ findings: Finding[]; artifact: null }>`: (1) parse the version tags out of `CHANGELOG.md` (regex on `## [X.Y.Z]` headings, capture body until next heading), (2) for each tag pair (current, previous), invoke `git log <prev>..<tag> --name-only --format=...` via Node's `execFileSync` from the standard library — pass `git` as the binary and refs as a quoted argv array (no shell interpolation; validate every ref against `^[a-zA-Z0-9_./-]+$` before passing), (3) for each commit, AST-diff the public surface files between the two tagged versions (`git show <ref>:<file>` → temp file → AST extract → set comparison), (4) compare the resulting `addedSymbols` / `removedSymbols` / `changedSymbols` set against the changelog body (case-insensitive substring match on normalized symbol names), (5) emit findings: `documented-but-not-in-diff` (changelog over-claims) and `in-diff-but-not-documented` (changelog under-claims). Wire orchestrator's stubs for `runDocs` and `runChangelog` to call the real implementations.

**Checkpoint**: All three user stories independently functional. Running `npm run audit` (no flags) produces every artifact pair with real data from this codebase.

---

## Phase 6: Cross-cutting — Orchestrator wiring + diff tool

**Purpose**: Finalize the orchestrator's aggregation across all four modules; ship the `audit:diff` companion.

- [ ] T022 Replace the stubbed module dispatch in `scripts/audit.ts` (T006) with the four real module calls (`runConsistency`, `runCompliance`, `runDocs`, `runChangelog`); aggregate every module's `findings` array into a single ordered list sorted by `id`; write `findings.md` (grouped by `category` then by `severity`) and `findings.json`; honor `--fail-on=<severity>` for exit code 1; honor `--only=<module>` by dispatching only the named module function; honor `--quiet`.
- [ ] T023 [P] Implement `scripts/audit-diff.ts` per `contracts/audit-cli.md`: read `findings.json` at HEAD (working tree) and at the given git ref via `git show <ref>:specs/001-sdk-quality-audit/findings.json` (same safe `execFileSync` pattern as T021); compute `added` / `removed` / `unchanged` by `id`; print human summary to stdout by default, or JSON when `--json` is passed; exit codes per contract.
- [ ] T024 [P] Implement `tests/audit/audit-orchestrator.test.ts` — synthetic fixture tree where every module produces ≥1 finding; assert the orchestrator (a) writes all six artifact files, (b) produces byte-identical artifacts on re-run with the same fixture (validates FR-009 + research Decision 2), (c) honors `--only=` correctly, (d) returns exit code 1 when `--fail-on=high` and a high-severity finding exists.
- [ ] T025 [P] Implement `tests/audit/audit-diff.test.ts` — two synthetic `findings.json` payloads + a fake `git show` shim (or a real temporary git repo created in the test); assert added/removed/unchanged categorization is correct and stable.

**Checkpoint**: `npm run audit` and `npm run audit:diff` are both fully working. All unit tests pass. The implementation is production-ready.

---

## Phase 7: Run-the-audit + apply trivial remediations + record non-trivial findings

**Purpose**: Actually exercise the audit on the live codebase. This is where the *feature pays off* — the user finally sees what's wrong (or confirms nothing material is). Per FR-008, trivial findings are fixed in this PR; non-trivial findings are appended to this same `tasks.md` as Phase 8 entries.

- [ ] T026 Run `npm run audit` against the current `001-sdk-quality-audit` branch HEAD. Commit the resulting six artifact files (`compliance-report.{md,json}`, `consistency-matrix.{md,json}`, `findings.{md,json}`) into `specs/001-sdk-quality-audit/`. Inspect `findings.md` and confirm SC-001 (every file row populated), SC-002 (every method in matrix), SC-007 (under 30 min wall-clock).
- [ ] T027 For every finding in `findings.json` with `classification: "trivial"` and `remediation.kind: "in-pr"`: apply the fix described in `remediation.description` to the named file. Re-run `npm run audit -- --only=<module>` for the affected module after each fix; verify the finding no longer appears. Commit the trivial fixes alongside the audit artifacts. Target: 100% trivial fixes resolved (SC-008).
- [ ] T028 For every finding in `findings.json` with `classification: "non-trivial"`: append a discrete `T1xx` task entry to **Phase 8** of this file (`specs/001-sdk-quality-audit/tasks.md`) using the format `- [ ] T1xx Remediate finding <finding_id> in <file>: <proposed_approach> — target version: <version_impact>`. Re-run `npm run audit` once more; commit the updated `findings.{md,json}` + the appended task entries. These T1xx tasks become the input to subsequent release cycles, scheduled into the appropriate MINOR or MAJOR milestone.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Tie the audit infrastructure back into project-wide documentation and release process; record any remediation tasks T026–T028 produced.

- [ ] T029 [P] Update `CHANGELOG.md` under `## [Unreleased]` with a sub-bullet describing the new audit infrastructure (`scripts/audit.ts` + `scripts/audit-*.ts` + `scripts/audit-lib/` + `tests/audit/` + new `npm run audit` / `npm run audit:diff` scripts) and note target version `1.0.1` (PATCH, per constitution principle II — no public-API surface change).
- [ ] T030 [P] Add a "Quality audit" subsection to `README.md` (insert after the "Examples" section) — three short paragraphs: (a) what the audit does, (b) how to run it (`npm run audit`), (c) where the artifacts live (link to `specs/001-sdk-quality-audit/`). Keep under 20 lines.
- [ ] T031 [P] Update `.specify/memory/constitution.md` Governance section's note about compliance-review tooling: add a single sentence pointing at `npm run audit` as the canonical pre-release check. PATCH bump (1.0.0 → 1.0.1) per the constitution's own amendment rules — wording clarification, no principle redefinition. Update the constitution's `LAST_AMENDED` line and prepend a one-line Sync Impact Report.
- [ ] T032 Run the full pre-release sequence per `quickstart.md` "Re-running on every release" to verify the new audit fits cleanly: `npm run check-spec` → `npm run build` → `npm test` → `npm run audit` → `npm run test:integration`. Confirm all pass; confirm `npm run audit` exits 0 (no `--fail-on`); confirm all six artifacts are reproducible (re-run; `git status` shows no changes).

### Remediation Tasks (populated by T028)

> **NOTE**: This subsection starts empty. T028 will append one `T1xx` entry per non-trivial finding produced by the audit run in T026. These entries describe remediation work for subsequent release cycles; they are NOT scheduled into this audit's PR.

*(populated during execution)*

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately.
- **Foundational (Phase 2)**: Depends on Setup; T002 must precede T003–T006 (others depend on its types); T003/T004/T005 parallelizable among themselves; T006 depends on T002 only.
- **US1, US2, US3 (Phases 3, 4, 5)**: All depend on Foundational completion. Once Foundational is done, the three stories can proceed entirely in parallel (different developers, different files). Within each story, tests can be authored in parallel with implementation.
- **Cross-cutting (Phase 6)**: Depends on all three user stories — needs each module's real implementation in place to wire into the orchestrator and to produce realistic findings for the diff tool.
- **Run-the-audit (Phase 7)**: Depends on Phase 6 (audit must be fully working before we run it against the live codebase). T027 depends on T026 output; T028 depends on T026 output. T027 and T028 can run in parallel (touch different finding sets).
- **Polish (Phase 8)**: Mostly parallelizable after Phase 7. T032 depends on T029/T030/T031 (release-readiness check after docs land).

### User Story Dependencies

- **US1 (consistency, P1)**: Independent of US2 and US3 after Foundational. Touches `scripts/audit-consistency.ts` + `tests/audit/audit-consistency.test.ts` + fixtures only.
- **US2 (compliance, P2)**: Independent of US1 and US3 after Foundational. Touches `scripts/audit-compliance.ts` + `scripts/verify-endpoints.ts` (extension only — additive) + `tests/audit/audit-compliance.test.ts` + fixtures only.
- **US3 (docs/changelog, P3)**: Independent. Two independent sub-modules (`audit-docs.ts` and `audit-changelog.ts`) parallelizable within the story.

### Within Each User Story

- Tests are paired with implementation but not gating (these are regression tests, not TDD).
- Fixtures created first ([P]) so tests can be authored alongside implementation.
- Module implementation MUST complete before that module's orchestrator-stub replacement (which happens in the same T-pair within the story).

### Parallel Opportunities

- All `[P]` tasks within Foundational (T003, T004, T005).
- All three user-story phases in their entirety, once Foundational is done.
- Within each story: fixture and test tasks marked `[P]`.
- Cross-cutting Phase 6: T023, T024, T025 all `[P]` (different files).
- Polish Phase 8: T029, T030, T031 all `[P]`.

---

## Parallel Example: User Stories 1, 2, 3 in parallel after Foundational

```bash
# Developer A — US1 (consistency):
Task: T007 Create tests/audit/fixtures/consistency/...
Task: T008 Implement tests/audit/audit-consistency.test.ts
Task: T009 Implement scripts/audit-consistency.ts
Task: T010 Wire markdown rendering + orchestrator stub

# Developer B — US2 (compliance):
Task: T011 Create tests/audit/fixtures/compliance/...
Task: T012 Implement tests/audit/audit-compliance.test.ts
Task: T013 Extend scripts/verify-endpoints.ts with --json
Task: T014 Implement scripts/audit-compliance.ts
Task: T015 Wire markdown rendering + orchestrator stub

# Developer C — US3 (docs + changelog):
Task: T016 + T018 Create tests/audit/fixtures/{docs,changelog}/...
Task: T017 + T019 Implement tests/audit/audit-{docs,changelog}.test.ts
Task: T020 Implement scripts/audit-docs.ts
Task: T021 Implement scripts/audit-changelog.ts
```

All three converge at Phase 6 (T022 orchestrator wiring) and then proceed sequentially to Phase 7 (the live run).

---

## Implementation Strategy

### MVP First (US1 only)

1. Phase 1 → Phase 2 → Phase 3 (US1).
2. **Stop and validate**: at this point `npm run audit -- --only=consistency` produces a real Consistency Matrix for the codebase. Review it manually for false positives / false negatives before continuing.
3. If the matrix looks right, proceed to US2 + US3 in parallel.

### Incremental Delivery

1. Setup + Foundational → infrastructure ready.
2. Add US1 → real consistency matrix in artifacts; demo-able.
3. Add US2 → compliance report joins the matrix; demo-able.
4. Add US3 → docs + changelog cross-checks join; full audit; demo-able.
5. Cross-cutting + Run-the-audit → actual findings produced and (trivial) fixes applied.
6. Polish → release-ready.

### Parallel Team Strategy

With three developers post-Foundational: A on US1, B on US2, C on US3 (US3 itself is splittable but small enough for one person). All converge at Phase 6 for orchestrator wiring (T022 is sequential — one person owns the merge).

---

## Notes

- `[P]` tasks = different files, no dependencies on incomplete tasks.
- `[Story]` label maps task to user story for traceability against `spec.md`.
- The orchestrator skeleton (T006) intentionally precedes per-module work so that `npm run audit` is runnable end-to-end at every checkpoint — every story phase ends with an executable improvement to the artifacts.
- Phase 7 is the recursive task: running the audit *produces* the list of remediation tasks that gets appended to Phase 8. This is intentional and documented in FR-008.
- Commit after each task or logical pair. Stop at any phase checkpoint to validate the increment.
- Avoid: cross-story dependencies, same-file conflicts between `[P]` tasks, hand-editing `src/types/generated.ts` (forbidden by constitution principle I — the audit is a *reader* of generated code, never a writer).
