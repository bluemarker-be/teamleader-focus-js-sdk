# Feature Specification: SDK Quality & Consistency Audit

**Feature Branch**: `001-sdk-quality-audit`

**Created**: 2026-05-19

**Status**: Draft

**Input**: User description: "This is a zero dependency JS SDK for the teamleader focus api (public) and I want to do a thourough checkup if everything is consistently programmed and is of the highetst quality."

## Clarifications

### Session 2026-05-19

- Q: What format should the three audit artifacts (Compliance Report, Consistency Matrix, Findings registry) take? → A: Markdown for human review + JSON sidecar for machine-readable diffing.
- Q: Should audit findings persist state (IDs, status) across runs at different commits, or is each run a fresh scan? → A: Stateless — each run regenerates findings from scratch; cross-run lineage lives in `git diff` of the artifact files.
- Q: When the audit finds a method-name divergence across resources (e.g. `add` vs. `create`), who picks the canonical form? → A: Audit flags only — every divergence is surfaced with variants, occurrence counts, and any referenced conventions; the user picks the canonical form during PR review. The audit MUST NOT auto-arbitrate canonical names, given that every rename is a MAJOR-impacting decision affecting ~100 pinned consumers.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Cross-resource surface consistency (Priority: P1)

A developer integrating the SDK into a customer Edge Function uses one
resource (say `teamleader.contacts`) and then needs a second one
(say `teamleader.companies`). They expect to be able to predict the
second resource's method names, parameter shape, return type, and
error matrix from the first one — without re-reading the README — because
the SDK exposes 68 resources generated from a single OpenAPI spec.

**Why this priority**: This is the most consumer-visible aspect of
"consistency." Surface inconsistency forces every consumer to memorize
68 separate vocabularies; surface consistency makes the SDK feel like
one cohesive API instead of 68 hand-rolled wrappers. A single
`add()` vs. `create()` divergence between sibling resources will be
hit by ~100 production Edge Functions and is the kind of finding that
generates the most support pressure.

**Independent Test**: Generate a per-method consistency matrix across
all 68 resources. The story is satisfied when, for every method name
that appears on more than one resource (e.g. `list`, `info`, `add`,
`update`, `delete`, `tag`, `untag`, `download`, `assign`), the
parameter shape and return-envelope shape are identical wherever it
appears — or the deviation is documented as intentional with a recorded
rationale.

**Acceptance Scenarios**:

1. **Given** the consistency matrix has been generated for all 68
   resources, **When** a reviewer scans for divergent method names
   (e.g. `add` vs. `create`, `delete` vs. `remove`), **Then** every
   divergence is surfaced as a finding with all variants, their
   occurrence counts per resource, and any relevant conventions —
   and the reviewer (not the audit) decides per divergence whether
   to (a) propose a canonical form in a MAJOR-version proposal,
   (b) record an intentional deviation with a one-line justification,
   or (c) defer the decision to a follow-up audit cycle.
2. **Given** any method shared across resources, **When** its
   parameter shape is compared across resources, **Then** the
   non-resource-specific parameters (pagination, filters,
   `include`, sort) follow identical structure and naming.
3. **Given** any method shared across resources, **When** its return
   envelope is inspected, **Then** all instances return either
   `{ data: T }` (single-item) or an `AsyncIterable<T>` (list) —
   no resource invents a third envelope shape.

---

### User Story 2 — Constitution-principle compliance (Priority: P2)

A maintainer preparing the next release wants assurance that every file
under `src/` adheres to all six principles ratified in the constitution
(`.specify/memory/constitution.md` v1.0.0): spec-generated types, strict
semver post-1.0, multi-runtime portability, zero runtime dependencies,
typed errors with useful defaults, and live integration verification.

**Why this priority**: Constitution principles are the *systemic*
quality bar. A single Node-only import in `src/` silently breaks every
Deno Edge Function deployment; a single entry in `"dependencies"`
adds a permanent supply-chain surface to ~100 customer deployments.
These violations are catastrophic but quiet — they don't fail unit
tests. An audit pass is the right time to catch them once, before
they accumulate.

**Independent Test**: Produce a compliance report listing every file
under `src/`, every script under `scripts/`, and `package.json`,
with a "Compliance: yes / partial / no" mark against each applicable
principle. Story is satisfied when every cell is `yes`, or every
non-`yes` cell has a remediation outcome (fixed in this PR, or filed
as a remediation task with explicit reasoning).

**Acceptance Scenarios**:

1. **Given** the compliance report has been generated, **When** the
   reviewer scans `src/` for principle-III violations, **Then** zero
   imports from `node:*` or Node-only globals (`process`, `Buffer`,
   `__dirname`) appear in any file under `src/`.
2. **Given** the compliance report, **When** `package.json` is
   inspected, **Then** `"dependencies"` is empty (principle IV).
3. **Given** the compliance report, **When** error handling is
   inspected, **Then** every throw on a public code path produces a
   `TeamleaderFocusError` subclass, never a bare `Error` (principle V).
4. **Given** the compliance report, **When** any cell is marked
   `partial` or `no`, **Then** the report records the file path, the
   violating snippet, the principle violated, and a proposed
   remediation (in-PR fix or follow-up task).

---

### User Story 3 — Documentation & changelog accuracy (Priority: P3)

A consumer reading `README.md` or running an example from `examples/`
wants the code shown to work against the SDK version they have
installed. A maintainer reading `CHANGELOG.md` wants every release
entry to accurately describe what shipped, so semver decisions
(principle II) can be made from the changelog alone.

**Why this priority**: Documentation rot is the slow-burn quality
issue — it doesn't break builds, but it erodes trust and generates
support questions. Less acute than US1/US2, but the highest-impact
"polish" dimension once the structural issues are addressed.

**Independent Test**: Cross-check every public symbol mentioned in
`README.md` against the actual SDK exports; run every snippet in
`examples/` against the current SDK; cross-check every `CHANGELOG.md`
entry against the git log for that tag. Story satisfied when every
discrepancy is either fixed in this PR or filed as a remediation
task with explicit reasoning.

**Acceptance Scenarios**:

1. **Given** the README's resource list (68 entries with their method
   sets), **When** compared against the actual exports of the
   `TeamleaderFocusClient` class, **Then** every documented resource
   exists, every documented method exists on its resource, and no
   exported resource is missing from the README.
2. **Given** any code snippet in `README.md`, **When** type-checked
   against the current SDK's `.d.ts` files, **Then** the snippet
   passes type-checking without errors.
3. **Given** any file under `examples/`, **When** type-checked against
   the current SDK, **Then** it passes; if it requires network access
   it is excluded from automated runs but its imports and types still
   validate.
4. **Given** any version entry in `CHANGELOG.md` (e.g. `[1.0.0]`),
   **When** compared against the commits between that tag and the
   previous tag, **Then** every public-API change in those commits is
   reflected in the changelog entry, and no changelog claim refers to
   code that does not exist.

---

### Edge Cases

- **Intentional deviation**: Some resources have legitimate reasons to
  diverge (e.g., `cloudPlatforms.url` returns a URL, not an entity;
  `migrate.*` operates on legacy IDs, not Teamleader objects).
  The audit MUST distinguish "inconsistency" from "intentional
  asymmetry" by recording a justification per deviation, not by
  forcing every resource into the same template.
- **Findings that require a MAJOR bump**: If an audit finding can only
  be remediated by changing a public signature, it MUST be proposed as
  a v2.0.0 candidate (per constitution principle II), not silently
  applied. The user decides whether and when 2.0.0 ships.
- **Upstream spec drift mid-audit**: If `npm run check-spec` reports a
  new upstream version during the audit, the audit continues against
  the spec version currently bundled (`api-specs/1.157.0.yaml`); the
  new upstream version is filed as a separate task (sync + re-audit).
- **Resource with only one method**: 27+ resources expose only one or
  two methods (e.g. `tags.list`, `priceLists.list`). The consistency
  matrix MUST include them but MUST NOT flag them as "missing"
  methods that other resources expose — the upstream API doesn't
  offer those operations on those resources.
- **Generated code with deliberate patches**: Findings in
  `src/types/generated.ts` MUST be interpreted via
  `scripts/generate-types.ts` (the patches). A "wrong" type in the
  generated file is either an upstream spec issue (file with Teamleader,
  add a patch) or a stale patch (update patch); never hand-edit the
  generated output.
- **Missing live integration test for an unsafe-to-run method**: Some
  methods (e.g. `invoices.book`, `creditNotes.sendViaPeppol`) have
  side effects that can't be exercised against the production tenant.
  The audit MUST permit a documented exemption: a comment in the
  integration test file naming the method, the reason it can't be
  live-tested, and the unit-test coverage that substitutes.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The audit MUST inspect every file under `src/`, every
  script under `scripts/`, every test under `tests/`, and the project
  config files (`package.json`, `tsconfig.json`, `vitest.config.ts`,
  `vitest.integration.config.ts`) and classify each against the six
  constitution principles as `yes` / `partial` / `no` / `n/a`. The
  result MUST be written as both a human-readable markdown file
  (`compliance-report.md`) and a machine-readable JSON sidecar
  (`compliance-report.json`) under the feature directory.
- **FR-002**: The audit MUST produce a single consistency matrix
  covering all 68 public resources exposed on `TeamleaderFocusClient`,
  listing each resource's methods, their parameter shape, their return
  envelope shape, and the error subclasses they can throw. The result
  MUST be written as both `consistency-matrix.md` (human-readable)
  and `consistency-matrix.json` (machine-readable) under the feature
  directory.
- **FR-003**: The audit MUST flag every cross-resource deviation in
  method naming, parameter naming, return shape, or error handling.
  For each deviation, the audit MUST record (a) all variants
  observed, (b) the count of each variant across resources, and
  (c) any relevant conventions from the upstream OpenAPI spec or
  the SDK's own existing naming. The audit MUST NOT auto-pick a
  canonical form — the choice between `align` (remediate to a
  canonical form, requiring a MAJOR-version proposal per
  constitution principle II) and `intentional` (record justification,
  do not change) is made by the human reviewer during PR review,
  not by the audit's automation.
- **FR-004**: For every public method missing live integration coverage
  (as defined by `npm run verify:endpoints`), the audit MUST either
  add a passing live test in this PR or file a remediation task with
  the reason coverage is deferred (per the "unsafe-to-run" exemption
  rule under Edge Cases).
- **FR-005**: The audit MUST cross-check `README.md` against the
  SDK's exported surface and flag every documented-but-absent symbol,
  every present-but-undocumented public resource/method, and every
  README code snippet that fails type-checking against the current
  `.d.ts` files.
- **FR-006**: The audit MUST type-check every file under `examples/`
  against the current SDK and flag any failure.
- **FR-007**: The audit MUST cross-check `CHANGELOG.md` against the
  git history between consecutive tags and flag every version entry
  whose claims are absent from, contradicted by, or incomplete
  relative to the actual commits in that range.
- **FR-008**: Findings MUST be classified as `trivial` (single file,
  no public-API surface change, no behavior change observable to a
  caller) or `non-trivial` (multi-file, behavior change, or any
  signature change). Trivial findings MUST be remediated in the same
  PR as the audit; non-trivial findings MUST be filed as discrete
  remediation tasks (in `tasks.md` produced by `/speckit-tasks`) with
  a proposed approach and a target version classification (PATCH /
  MINOR / MAJOR per constitution principle II). All findings MUST be
  recorded in both `findings.md` (human-readable, grouped by
  category and severity) and `findings.json` (machine-readable,
  one record per finding using the Audit Finding entity schema).
- **FR-009**: The audit MUST be reproducible and stateless:
  re-running it on the same commit SHA produces the same findings
  set, byte-for-byte; re-running it on a different SHA regenerates
  findings from scratch with no carry-over of IDs, status, or
  history from prior runs. Cross-run lineage is observable via
  `git diff` of the artifact files (`findings.md`, `findings.json`,
  etc.) committed alongside each audit. Where the audit relies on
  automated scripts, those scripts MUST be checked into `scripts/`
  so the audit can be re-executed before each release.
- **FR-010**: The audit MUST NOT silently change any public-API
  signature. Any proposed signature change MUST be surfaced as a
  remediation task with the version classification it would require.

### Key Entities

- **Audit Finding**: One specific issue discovered. Attributes:
  `id` (run-local identifier, stable only within one audit run for
  cross-referencing between `findings.md` and `findings.json`;
  NOT stable across runs — see FR-009), `category` (consistency /
  principle-compliance / documentation / changelog), `location`
  (file path + line range), `principle` (which constitution
  principle, if applicable), `severity` (low / medium / high),
  `classification` (trivial / non-trivial), `remediation` (in-PR
  fix description, OR proposed approach for a follow-up task),
  `version_impact` (none / patch / minor / major) for non-trivial
  remediations.
- **Consistency Matrix**: A per-resource × per-method table covering
  all 68 resources. Cells indicate method presence, parameter
  shape, return envelope shape, and error subclasses thrown. Used
  to detect deviations and to record intentional asymmetries.
- **Compliance Report**: A per-file × per-principle table covering
  every audited file. Cells are `yes` / `partial` / `no` / `n/a`.
  Drives FR-001 findings.
- **Remediation Task**: A non-trivial finding scoped for follow-up
  work. Attributes: `finding_id` (links back to the Audit Finding),
  `proposed_approach`, `effort_estimate`, `version_impact`,
  `acceptance_criteria`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of files under `src/`, `scripts/`, and the project
  config set have a row in the Compliance Report with every
  applicable principle answered (no missing cells).
- **SC-002**: 100% of public resource methods (every method on every
  one of the 68 resources exposed by `TeamleaderFocusClient`) appear
  in the Consistency Matrix.
- **SC-003**: After the audit, the number of unjustified cross-resource
  divergences in shared method names, parameter shapes, and return
  envelopes is zero. Every remaining divergence has either been
  remediated (canonical form adopted) or recorded with a one-line
  justification.
- **SC-004**: After the audit, every public method either has a
  passing live integration test or carries a documented
  "unsafe-to-run" exemption naming its substitute unit-test
  coverage. Coverage gap count, post-audit, is zero.
- **SC-005**: After the audit, every symbol named in `README.md`
  resolves against the current SDK exports, every README code
  snippet type-checks, and every file under `examples/` type-checks.
  Documentation discrepancy count, post-audit, is zero.
- **SC-006**: After the audit, every version entry in `CHANGELOG.md`
  accurately reflects the public-API changes between that tag and
  its predecessor — verified by spot-checking at least the last
  three released versions against `git log`. Inaccuracy count for
  audited entries, post-audit, is zero.
- **SC-007**: The audit can be re-executed end-to-end (automated
  checks + manual review) in under 30 minutes on a fresh checkout,
  so it can be run before each release without becoming a workflow
  blocker.
- **SC-008**: 100% of findings classified as `trivial` are resolved
  in the same PR as the audit; ≥80% of findings classified as
  `non-trivial` are converted into remediation tasks accepted into
  the next MINOR release cycle.

## Assumptions

- **Quality bar = constitution v1.0.0**. The audit measures the
  codebase against the principles ratified in
  `.specify/memory/constitution.md`. New rules discovered as
  *necessary* during the audit MUST be filed as constitution
  amendments via `/speckit-constitution`, not silently adopted as
  audit findings.
- **Deliverable scope = report + trivial fixes in this PR + remediation
  task list for non-trivial findings.** The audit is not "report only"
  (that would leave the work undone) and is not "fix everything"
  (some findings legitimately require user input on version impact).
  The split is governed by FR-008's `trivial` / `non-trivial`
  classification.
- **Audited surface**: `src/**`, `scripts/**`, `tests/**`,
  `package.json`, `tsconfig.json`, `vitest*.config.ts`, `README.md`,
  `CHANGELOG.md`, `examples/**`. Excluded: `node_modules/`, `dist/`
  (build output), `api-specs/**` (upstream-owned), `.specify/**`,
  `.claude/**`, `.env*`.
- **Reproducibility tooling**: where the audit needs automation
  beyond what already exists (`check-spec`, `diff-spec`,
  `verify:endpoints`, `test:coverage`), the new scripts will be
  added to `scripts/` so the audit can be re-run on a future commit.
  Adding such scripts is itself a deliverable of this feature
  (not an out-of-scope follow-up).
- **MAJOR-version proposals stay proposed**. If a finding's only
  clean remediation is a breaking change, the audit produces a
  v2.0.0 candidate proposal but does not modify the public API in
  this PR. The user decides whether 2.0.0 ships and when.
- **Upstream spec is treated as immutable input**. Findings that
  trace to a Teamleader spec issue (`api-specs/1.157.0.yaml`) are
  recorded as either a patch in `scripts/generate-types.ts` or a
  ticket filed with Teamleader — never as a hand-edit of
  `src/types/generated.ts`.
- **The audit has no external dependency on a Teamleader credential
  beyond what the existing `test:integration` flow already requires
  (OAuth credentials in `.env`, the same tenant integration tests
  already use).** No new test tenant, no new credential.
- **The integration with the existing test infrastructure
  (`vitest`, `tests/integration/`, `tests/live/`, `scripts/`) is
  authoritative**. The audit extends those, it does not replace them.
