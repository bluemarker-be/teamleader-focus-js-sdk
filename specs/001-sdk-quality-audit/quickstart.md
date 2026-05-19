# Quickstart: SDK Quality & Consistency Audit

**Feature**: [spec.md](./spec.md) · **Plan**: [plan.md](./plan.md)

This is the "how do I actually run the audit?" guide. It complements
[`contracts/audit-cli.md`](./contracts/audit-cli.md) (the formal
command contract) with a practical, task-oriented walkthrough.

---

## Prerequisites

Same as the existing development environment:

1. Node ≥18 (per `package.json` engines).
2. `npm install` has run.
3. For the live-coverage portion (FR-004), the same `.env` the
   existing `npm run test:integration` flow uses. The static-analysis
   portion runs without any credentials.

No new tools, no new credentials.

## Running the full audit

```bash
npm run audit
```

This runs every audit module in sequence and writes six files under
`specs/001-sdk-quality-audit/`:

- `compliance-report.md` + `compliance-report.json`
- `consistency-matrix.md` + `consistency-matrix.json`
- `findings.md` + `findings.json`

Expected wall-clock time on a fresh checkout: under 30 minutes
(SC-007). The static-analysis phase finishes in <2 minutes; the
rest is the live-coverage verification (which runs against the
Teamleader API).

Stdout shows a per-module summary like:

```
[audit] compliance       … 4 findings (1 high, 2 medium, 1 low)
[audit] consistency      … 6 findings (3 divergence clusters detected)
[audit] docs             … 2 findings (1 broken snippet, 1 stale resource)
[audit] changelog        … 0 findings
[audit] live-coverage    … 3 findings (3 methods without live tests; 2 exempted)
[audit] wrote 6 artifacts to specs/001-sdk-quality-audit/
```

Exit code is 0 unless you pass `--fail-on=<severity>` (see CLI contract).

## Running a single module

Useful while developing or iterating on a specific module:

```bash
npm run audit -- --only=compliance
npm run audit -- --only=consistency
npm run audit -- --only=docs
npm run audit -- --only=changelog
```

Only the named module runs; its artifact pair is written; other
existing artifacts are left untouched.

## Diffing two audit runs

Stateless audits + a stable schema (research Decision 2) mean
"what's changed since the last audit?" reduces to a JSON diff:

```bash
# Diff against the last committed audit on this branch
npm run audit:diff -- HEAD~1

# Diff against the audit baseline on main
npm run audit:diff -- main

# Diff against a specific tag's audit
npm run audit:diff -- v1.0.0
```

Output is grouped into **Added**, **Removed**, and **Unchanged**
sections. Use `--json` to pipe into other tools.

## Reading the artifacts

### `compliance-report.md`

A grid: rows are audited files, columns are the six constitution
principles (I–VI). Cells say `yes`, `partial`, `no`, or `n/a`. Any
`partial` or `no` cell links to the findings that explain it. Read
top-down: file path tells you where, principle column tells you
which rule, finding tells you what specifically.

### `consistency-matrix.md`

A grid: rows are resources, columns are method names. Cells say
which method names are present and any divergence flags. A
separate "Divergence clusters" section at the bottom lists each
divergence with all variants, occurrence counts, and the affected
resources. Per the Q3 clarification, the audit does NOT pick a
canonical form — that decision belongs to the reviewer.

### `findings.md`

Every finding the audit produced, grouped first by category
(`consistency`, `principle-compliance`, `documentation`, `changelog`)
and within each by severity (`high`, `medium`, `low`). Each finding
shows location, message, classification (`trivial` / `non-trivial`),
and remediation (the in-PR fix or the proposed task).

## Re-running on every release

This audit is intended to run before every release tag (per
constitution Governance section). The recommended sequence:

```bash
npm run check-spec               # 1. Catch upstream spec drift
npm run generate                 # 2. Regenerate types if spec changed
npm run build                    # 3. Type-check the SDK
npm test                         # 4. Unit tests
npm run audit                    # 5. Quality + consistency audit
npm run test:integration         # 6. Live API
# Commit any in-PR remediations the audit applied;
# review findings.md for non-trivial follow-ups
```

Steps 5 and 6 can be parallelized: step 5's live-coverage
verification reuses the same data step 6 produces, but for
freshness the audit re-invokes it.

## Common questions

**Q: Why does the audit live under `scripts/`, not `src/`?**
The audit is project tooling — it inspects the SDK but isn't part
of what we publish. Per constitution principle III, `src/` is
restricted to multi-runtime-portable code; `scripts/` may freely
use Node APIs (`node:fs`, `process`, etc.), which the audit needs.

**Q: How do I know if a finding requires my input vs. is fixed?**
A finding's `remediation.kind` is either `in-pr` (the audit
already applied a fix in this PR; verify in `git diff`) or `task`
(the finding needs a follow-up; it'll appear in `tasks.md` after
`/speckit-tasks` runs).

**Q: The audit flagged a divergence and wants me to pick a
canonical form. How do I record my decision?**
Edit the affected finding's `remediation` in `findings.json`
(or just respond in PR review). The next audit run won't pick a
different canonical — the audit itself stays neutral per Q3.
What changes the audit's verdict is *the code change* you make to
align resources to your chosen canonical (which will be a MAJOR
bump per constitution principle II).

**Q: I made code changes — can I re-run just the consistency
module?**
Yes: `npm run audit -- --only=consistency`. The other artifacts
keep their existing content.

**Q: I want to add the audit to CI. What flags?**
`npm run audit -- --fail-on=high --quiet`. CI exits non-zero only
if a `high`-severity finding remains unresolved (typical for
unreleased `partial` / `no` cells on critical principles).
