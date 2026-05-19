/**
 * Unit tests for scripts/audit-changelog.ts.
 *
 * Hermetic: never invokes real git. All git interactions are mocked
 * via the opts.tagList Set and opts.indexChangedBetween function
 * that runChangelogAgainst accepts.
 */

import { describe, expect, it } from "vitest";

import {
  runChangelogAgainst,
  parseChangelogEntries,
} from "../../scripts/audit-changelog.js";
import type { AuditContext } from "../../scripts/audit-lib/types.js";

const CTX: AuditContext = {
  sha: "0000000000000000000000000000000000000000",
  branch: "test",
  repoRoot: "/fake/repo",
};

// ---------------------------------------------------------------------------
// parseChangelogEntries
// ---------------------------------------------------------------------------

describe("parseChangelogEntries", () => {
  it("parses simple [X.Y.Z] - DATE headings", () => {
    const md = `# Changelog

## [Unreleased] - 2026-05-19

Unreleased stuff.

## [1.0.0] - 2026-04-14

First stable release.

## [0.7.0] - 2026-04-14

Older.
`;
    const entries = parseChangelogEntries(md);
    expect(entries.map((e) => e.version)).toEqual(["Unreleased", "1.0.0", "0.7.0"]);
    expect(entries[1].date).toBe("2026-04-14");
    expect(entries[1].body).toContain("First stable release");
  });

  it("captures the body up to the next heading", () => {
    const md = `## [1.0.0] - 2026-04-14

Line one.

- bullet one
- bullet two

## [0.9.0] - 2026-04-01

Older.
`;
    const entries = parseChangelogEntries(md);
    const v100 = entries.find((e) => e.version === "1.0.0")!;
    expect(v100.body).toContain("bullet one");
    expect(v100.body).not.toContain("Older");
  });

  it("handles a heading without a date", () => {
    const entries = parseChangelogEntries("## [1.2.3]\n\nbody");
    expect(entries[0].version).toBe("1.2.3");
    expect(entries[0].date).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// runChangelogAgainst — drift detection
// ---------------------------------------------------------------------------

describe("runChangelogAgainst", () => {
  it("flags missing-git-tag for declared versions without matching tags", async () => {
    const changelog = `
## [Unreleased] - 2026-05-19

unreleased changes

## [1.0.0] - 2026-04-14

First stable release.

## [0.5.0] - 2026-03-01

Older release.
`;
    const result = await runChangelogAgainst(changelog, CTX, {
      changelogRelPath: "CHANGELOG.md",
      tagList: new Set(["v1.0.0"]), // 0.5.0 has no tag
      indexChangedBetween: () => false,
    });
    expect(
      result.findings.some((f) => f.message.includes("[0.5.0]") && f.message.includes("v0.5.0")),
    ).toBe(true);
    expect(result.findings.some((f) => f.message.includes("[1.0.0]"))).toBe(false);
  });

  it("never flags the Unreleased entry as missing a tag", async () => {
    const changelog = `## [Unreleased] - 2026-05-19\n\nstuff`;
    const result = await runChangelogAgainst(changelog, CTX, {
      changelogRelPath: "CHANGELOG.md",
      tagList: new Set(),
      indexChangedBetween: () => false,
    });
    expect(result.findings).toEqual([]);
  });

  it("flags silent-surface-change when index.ts changed but entry body is thin", async () => {
    const changelog = `
## [1.0.0] - 2026-04-14

Bugfix.

## [0.9.0] - 2026-04-01

First version with everything you'd expect from a complete SDK release including pagination, error handling, full coverage of every endpoint, and comprehensive documentation.
`;
    const result = await runChangelogAgainst(changelog, CTX, {
      changelogRelPath: "CHANGELOG.md",
      tagList: new Set(["v1.0.0", "v0.9.0"]),
      indexChangedBetween: (prev, curr) => prev === "v0.9.0" && curr === "v1.0.0",
    });
    expect(
      result.findings.some((f) => f.message.includes("v0.9.0 and v1.0.0")),
    ).toBe(true);
  });

  it("does NOT flag silent-surface-change when the entry body is substantial", async () => {
    const changelog = `
## [1.0.0] - 2026-04-14

A meaty release entry that mentions the new exported symbol foo, the renamed bar, and the deprecated baz, plus all the migration guidance any user could possibly need to handle the upgrade smoothly.

## [0.9.0] - 2026-04-01

Older.
`;
    const result = await runChangelogAgainst(changelog, CTX, {
      changelogRelPath: "CHANGELOG.md",
      tagList: new Set(["v1.0.0", "v0.9.0"]),
      indexChangedBetween: () => true,
    });
    expect(
      result.findings.find((f) => f.message.includes("silent-surface") || f.message.includes("undocumented")),
    ).toBeUndefined();
  });

  it("produces stable IDs and sorted findings (FR-009)", async () => {
    const changelog = `
## [1.0.0] - 2026-04-14

x

## [0.5.0] - 2026-03-01

y
`;
    const r1 = await runChangelogAgainst(changelog, CTX, {
      changelogRelPath: "CHANGELOG.md",
      tagList: new Set(),
      indexChangedBetween: () => false,
    });
    const r2 = await runChangelogAgainst(changelog, CTX, {
      changelogRelPath: "CHANGELOG.md",
      tagList: new Set(),
      indexChangedBetween: () => false,
    });
    expect(r1.findings.map((f) => f.id)).toEqual(r2.findings.map((f) => f.id));
    // sorted ascending
    const ids = r1.findings.map((f) => f.id);
    expect([...ids].sort()).toEqual(ids);
  });
});
