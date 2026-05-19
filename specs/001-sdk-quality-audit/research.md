# Research: SDK Quality & Consistency Audit

**Phase**: 0 (Outline & Research)
**Feature**: [spec.md](./spec.md) · **Plan**: [plan.md](./plan.md)

This document records the technical decisions made to support the
plan, with each decision's rationale and the alternatives considered.
There are no remaining `NEEDS CLARIFICATION` items from the spec —
the three clarifications captured under `## Clarifications` resolve
all material ambiguity for Phase 0.

---

## Decision 1: Static-analysis tooling

**Decision**: Use the **TypeScript Compiler API directly** (the `ts`
namespace from the already-installed `typescript` devDep) for all
source introspection — method extraction from resource classes,
import-statement analysis, throw-site detection, JSDoc capture.

**Rationale**:
- `scripts/verify-endpoints.ts` already uses this exact approach
  for endpoint introspection. Reusing the same toolchain keeps audit
  scripts stylistically uniform with existing project conventions and
  lets `scripts/audit-lib/ast.ts` share helpers with the existing
  script (or vice-versa).
- Zero new devDeps (constitution principle IV applies in spirit even
  to devDeps: every dep is a future maintenance surface).
- The Compiler API gives us TypeScript-aware semantics (type
  resolution, JSDoc, symbol identity) that pure regex parsing can't
  match — and we need those for accurately detecting subtle issues
  like "the throw target is a `TeamleaderFocusError` *subclass*"
  vs. "a bare `Error`."

**Alternatives considered**:
- **`ts-morph`** — friendlier API on top of the Compiler API, better
  ergonomics for tree traversal. Rejected: adds a devDep that
  provides syntactic sugar over a Compiler API we are already
  comfortable with. The ergonomics gain is real but doesn't outweigh
  the dep-count discipline.
- **Pure regex / grep** — fast, no parsing overhead. Rejected: brittle
  on multi-line constructs (e.g. `throw new` on a different line
  than the constructor call), no awareness of types/symbols, fails
  on subtleties (re-exported subclasses look like fresh classes).
- **A separate AST tool like `acorn` or `swc`** — fast, but TypeScript
  type information is essential for this audit, and a non-TS parser
  would force us to do type resolution ourselves.

## Decision 2: Reproducibility approach (FR-009)

**Decision**: Make audit output **byte-identical on the same SHA** by:

1. **Sort all JSON object keys** before serialization (use a custom
   `stableStringify(obj)` helper in `scripts/audit-lib/render.ts`).
2. **Sort all arrays** by their content-derived key (findings by
   `id`, matrix rows by resource name, matrix columns by method
   name, compliance rows by file path).
3. **No timestamps in artifact files.** The current git SHA is
   embedded in the JSON sidecars (so a reader can identify the audit
   run), but no wall-clock time is written.
4. **Content-derived finding IDs** (Decision 4) — same input always
   yields the same ID.
5. **POSIX path separators** in all written paths regardless of host
   OS (so Windows runs and macOS runs produce identical artifacts).
6. **Deterministic iteration**: where we walk `Map` or `Set`, we
   sort the keys first; never iterate raw insertion order.

**Rationale**: FR-009 is verifiable only if "same SHA, same output"
holds byte-for-byte. The audit is committed alongside the PR; the
next audit run's diff against the previous (on the same SHA) is the
proof that the audit is stable. Sorting + content-derived IDs cost
near-nothing to implement and make the property easy to test
(snapshot-test the rendered output).

**Alternatives considered**:
- **Allow non-deterministic ordering, deduplicate at diff time**:
  rejected — would require a dedicated diff tool to be useful, and
  silent reordering would mask real changes.
- **Persist run state to compare against**: rejected — Q2 clarified
  the audit is stateless, so any persisted state is the wrong primitive.

## Decision 3: Finding ID scheme

**Decision**: Finding `id` is a **lowercase hex SHA-256 truncated to
16 characters** of a canonical fingerprint string:
`{category}|{file}|{principle ?? "-"}|{location.start}-{location.end}|{message}`.

**Rationale**:
- Stable within a run (Q2 clarification requirement) without being
  stable across runs (also Q2): the same finding on the same code
  always gets the same ID, but if the underlying code changes (which
  shifts `location` or `message`), the ID changes too. This is a
  feature: a moved or modified finding *is* a different finding for
  diff purposes.
- 16 hex chars ≈ 64 bits of entropy — collision probability for
  hundreds of findings is negligible.
- Computable from finding content alone — no global counter, no
  side-effect ordering. Supports reproducibility (Decision 2).

**Alternatives considered**:
- **Sequential numbering (`F001`, `F002`...)**: rejected — sequence
  depends on iteration order, which is non-deterministic unless we
  pre-sort findings before assigning IDs. At which point, content-hash
  is just simpler and order-independent.
- **UUIDs**: rejected — non-deterministic; Q2 says no persistent
  identity is needed across runs.

## Decision 4: README ↔ exports cross-check (FR-005)

**Decision**: Two-pass cross-check:

1. **Resource-table parse**: extract the `## Resources` markdown
   table from `README.md` using a tiny markdown-table parser (~30
   LoC, lives in `scripts/audit-lib/markdown.ts`). Map each row to
   `(resource_name, method_names[])`. Diff against the introspected
   set of `(resource, method)` pairs from `src/resources/*.ts` +
   `src/client.ts`.
2. **Snippet type-check**: extract every fenced code block tagged
   `typescript` or `ts` from `README.md` into a temp directory as
   numbered files, then invoke `ts.createProgram(...)` on the temp
   dir with the SDK's `.d.ts` files in scope. Report any
   `ts.getPreEmitDiagnostics()` results as findings.

**Rationale**:
- Reuses TypeScript Compiler API (Decision 1) — no new toolchain.
- The markdown table is short and well-structured; a 30-LoC parser
  beats taking on a markdown-AST devDep for this single use.
- Snippet type-check catches real drift (e.g., a method's parameter
  shape changed but README's example still shows the old shape).

**Alternatives considered**:
- **`markdown-it` or `remark` for table parsing**: rejected — devDep
  for one table parse is overkill. If we end up needing structured
  markdown for more than tables, we'll revisit.
- **Snippet execution** (actually run the code): rejected — would
  need real or mocked HTTP, balloons execution time, doesn't add
  much over type-checking for catching documentation drift.

## Decision 5: CHANGELOG ↔ git log cross-check (FR-007)

**Decision**: For each version tag in `CHANGELOG.md` (e.g. `[1.0.0]`,
`[0.7.0]`, `[0.6.0]`), use `git log <prev-tag>..<tag> --name-only --format="%s%n%b"` to enumerate commits in that range. Classify each
commit by:

- **Public-surface change**: any file under `src/index.ts` or
  `src/resources/*.ts` or `src/oauth.ts` or `src/errors.ts` modified
  in a way that adds/removes/renames an exported symbol (detected via
  AST diff between the tagged versions).
- **Internal-only change**: changes elsewhere (`src/client.ts`
  internals, `scripts/`, `tests/`, etc.).

For each public-surface change, check whether the changelog entry for
that tag mentions it (case-insensitive substring match on a normalized
symbol list). Report:
- **Documented-but-not-in-diff**: changelog claims an addition that
  doesn't appear in the tagged commits → likely inaccurate entry.
- **In-diff-but-not-documented**: a public symbol changed in the
  range but the changelog doesn't mention it → likely missing entry.

**Rationale**: Public-surface changes are exactly the ones semver
(constitution principle II) governs. They're also the ones consumers
care about. The audit's job is to surface drift between what we
shipped and what we said we shipped.

**Alternatives considered**:
- **Manual review only** (no automation): rejected — defeats FR-009
  reproducibility for the changelog dimension.
- **Diff every commit, not just per-tag-range aggregate**: rejected
  — changelog entries are per-release, not per-commit, so the right
  granularity to compare is per-tag.
- **Audit only tags from the last N versions**: deferred to per-run
  configuration; for now, scan all tags listed in `CHANGELOG.md`
  (currently 12).

## Decision 6: Reuse `scripts/verify-endpoints.ts` for FR-004

**Decision**: Reuse the existing `verify-endpoints.ts` for live-coverage
gap detection. Extend it (in this feature) to accept a `--json`
flag that emits its findings as structured JSON to stdout, which
`scripts/audit.ts` will consume and fold into `findings.json` as
`category: "principle-compliance", principle: "VI"` entries. The
existing human-readable stdout output stays unchanged when `--json`
is not passed.

**Rationale**:
- Don't rebuild what already works. `verify-endpoints.ts` already
  handles the hard problem (mapping spec endpoints to resource
  methods, tracking the `INTENTIONALLY_SKIPPED` exemptions used by
  FR-004's "unsafe-to-run" rule).
- Adding `--json` is a small, backward-compatible extension. The
  default stdout output remains useful for ad-hoc human invocation.
- Keeps the audit honest: the same authoritative tool used in
  pre-release checks is the one feeding the audit, so audits can't
  disagree with `verify:endpoints` runs.

**Alternatives considered**:
- **Duplicate the logic in `audit-compliance.ts`**: rejected — two
  sources of truth would drift; bug fixes would need to land in both.
- **Have the audit shell out to `verify:endpoints` and parse stdout**:
  rejected — fragile against output-format changes; structured JSON
  is the right interface.

## Decision 7: Audit-script entry point and CLI surface

**Decision**: Add three npm scripts to `package.json`:

- `npm run audit` — orchestrator (`scripts/audit.ts`); runs all
  audit modules sequentially; writes all six artifact files; exits
  0 if no `severity: "high"` findings remain unresolved.
- `npm run audit -- --only=compliance|consistency|docs|changelog`
  — runs a single audit module; writes only its artifact pair.
  Useful during development and for targeted re-runs.
- `npm run audit:diff -- <other-sha-or-ref>` —
  (`scripts/audit-diff.ts`) — diff findings.json between the current
  working tree's audit output and the audit output at another git
  ref. Output: added findings, removed findings, unchanged findings.

**Rationale**:
- One canonical "run the whole thing" command (`npm run audit`)
  satisfies SC-007's "audit can be re-executed end-to-end" — a fresh
  contributor only needs to remember one command.
- Per-module sub-runs (`--only=`) keep development of individual
  audit modules fast.
- The diff command makes Q2's stateless-with-git-as-history model
  ergonomic — no need to remember `git show <sha>:specs/.../findings.json | diff -`.

**Alternatives considered**:
- **Single script with no sub-modules**: rejected — would be slow to
  iterate on during development, and harder to unit-test in isolation.
- **A separate `audit` directory at repo root (not under `scripts/`)**:
  rejected — `scripts/` is the existing home for project tooling;
  no reason to fragment.

---

## Items deferred to planning / implementation phase

- **Exact JSON schema fields** for each artifact → see
  `contracts/*.schema.json` (Phase 1 output).
- **Per-module algorithm pseudo-code** → kept inside each
  `scripts/audit-*.ts` as JSDoc on the module's main function;
  not extracted here.
- **Test fixtures**: small synthetic input trees for unit tests
  → produced by `/speckit-tasks` and authored during implementation.

## Resolved NEEDS CLARIFICATION items

None — the three clarifications in `spec.md` cover the material
unknowns. Decisions 1–7 here are technical choices within the bounds
those clarifications established.
