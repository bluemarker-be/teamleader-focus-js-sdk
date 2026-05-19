# Audit CLI Contract

The audit is exposed via three `npm run` scripts in `package.json`.
This document is the contract — implementations and consumers MUST
agree on the flag names, default behaviors, and exit codes specified
here.

## `npm run audit`

**Synopsis**: `npm run audit [-- --only=<module>] [-- --fail-on=<severity>]`

**Default behavior** (no flags): run every audit module sequentially,
write all six artifact files under `specs/001-sdk-quality-audit/`,
print a one-line summary per module to stdout, exit 0 unless
`--fail-on` says otherwise.

**Flags**:

| Flag | Type | Default | Description |
|---|---|---|---|
| `--only=<module>` | string | — | Run a single module. Values: `compliance`, `consistency`, `docs`, `changelog`. Only that module's artifact pair is written; existing artifacts for other modules are left untouched. |
| `--fail-on=<severity>` | string | `none` | Exit non-zero when ≥1 finding of the given severity remains *unresolved* (i.e., not classified as `in-pr` remediation). Values: `none`, `low`, `medium`, `high`. Default `none` means audit always exits 0 — the audit is reporting, not gating. Set to `high` in CI to gate releases. |
| `--quiet` | boolean | false | Suppress stdout summaries; only errors are printed. JSON output is unaffected. |
| `--help` / `-h` | boolean | false | Print usage and exit 0. |

**Exit codes**:

| Code | Meaning |
|---|---|
| 0 | Audit completed; severity threshold not crossed (or `--fail-on=none`). |
| 1 | Audit completed; ≥1 finding at or above `--fail-on` severity remains unresolved. |
| 2 | Audit aborted: an audit-script bug or environment problem (missing file, malformed source, etc.). Stderr contains the diagnostic. |

**Side effects**:

- Writes (creates or overwrites) these files under
  `specs/001-sdk-quality-audit/`:
  - `compliance-report.md`, `compliance-report.json`
  - `consistency-matrix.md`, `consistency-matrix.json`
  - `findings.md`, `findings.json`
- Does NOT modify any file outside that directory unless the audit is
  applying an `in-pr` remediation for a `trivial` finding (and even
  then, only the files named in the finding's `remediation.description`).

## `npm run audit -- --only=<module>`

Same as `npm run audit` but only the named module runs. The orchestrator
still writes a `findings.{md,json}` pair, but the file contains only
findings from the named module. The other artifact files
(`compliance-report.*`, `consistency-matrix.*`) are only written when
the corresponding module ran (`compliance` → compliance-report.*;
`consistency` → consistency-matrix.*; `docs` and `changelog` only
contribute to `findings.*`).

## `npm run audit:diff -- <git-ref>`

**Synopsis**: `npm run audit:diff -- <git-ref>`

**Default behavior**: compare the working-tree `findings.json` against
the `findings.json` at the given git ref. Print three sections to
stdout: **Added** (in HEAD, not in ref), **Removed** (in ref, not in
HEAD), **Unchanged** (in both; `id` matches). Exit 0 always.

**Flags**:

| Flag | Type | Default | Description |
|---|---|---|---|
| (positional) | git ref | required | Any ref `git show <ref>:specs/001-sdk-quality-audit/findings.json` can resolve (commit SHA, tag, branch name). |
| `--json` | boolean | false | Emit `{ added: [...], removed: [...], unchanged: [...] }` JSON to stdout instead of human summary. |
| `--help` / `-h` | boolean | false | Print usage and exit 0. |

**Exit codes**:

| Code | Meaning |
|---|---|
| 0 | Diff completed. |
| 2 | The ref doesn't have a `findings.json` at the expected path, or the file is malformed. Stderr contains the diagnostic. |

**Side effects**: none — `audit:diff` is read-only.

## `package.json` script entries (proposed addition)

```json
{
  "scripts": {
    "audit": "node --loader ts-node/esm scripts/audit.ts",
    "audit:diff": "node --loader ts-node/esm scripts/audit-diff.ts"
  }
}
```

Implementation note: the `--only=<module>` flag is parsed by the
orchestrator and dispatched to per-module functions. Modules are
not directly callable via npm; `scripts/audit-compliance.ts` etc.
do not have their own npm aliases (keeps the entry-point surface
small).
