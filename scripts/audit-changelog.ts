/**
 * Audit module: CHANGELOG accuracy (US3, T021).
 *
 * Cross-checks CHANGELOG.md against the git tag set and against
 * src/index.ts modification history per release range. Two finding
 * flavours:
 *
 *   - **missing-git-tag**: a CHANGELOG entry declares a version but
 *     no matching `vX.Y.Z` git tag exists. Either the tag was
 *     forgotten when the release shipped, or the entry was added
 *     speculatively and never released.
 *
 *   - **silent-surface-change**: between two consecutive released
 *     tags `src/index.ts` was modified (suggesting a public-surface
 *     change) but the CHANGELOG entry for the newer tag is short
 *     (heuristic: under 80 chars of meaningful prose).
 *
 * Git invocations live in audit-lib/git.ts so test code can inject
 * a hermetic alternative.
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import type {
  AuditContext,
  AuditModule,
  Finding,
} from "./audit-lib/types.js";
import { computeFindingId } from "./audit-lib/findings.js";
import { toPosixPath } from "./audit-lib/render.js";
import { gitTagList, gitFileChanged } from "./audit-lib/git.js";

// ---------------------------------------------------------------------------
// Production entry
// ---------------------------------------------------------------------------

export const runChangelog: AuditModule<null> = async (ctx) => {
  const changelogPath = resolve(ctx.repoRoot, "CHANGELOG.md");
  if (!existsSync(changelogPath)) {
    return { findings: [], artifact: null };
  }
  const changelogContent = readFileSync(changelogPath, "utf8");

  return runChangelogAgainst(changelogContent, ctx, {
    changelogRelPath: toPosixPath(changelogPath, ctx.repoRoot),
    tagList: gitTagList(ctx.repoRoot),
    indexChangedBetween: (prev, curr) =>
      gitFileChanged(ctx.repoRoot, prev, curr, "src/index.ts"),
  });
};

/**
 * Test-friendly entry: callers inject the changelog content, the tag
 * list, and a function answering "was src/index.ts changed between
 * these two tags?" so the test never invokes real git.
 */
export async function runChangelogAgainst(
  changelogContent: string,
  ctx: AuditContext,
  opts: {
    changelogRelPath: string;
    tagList: Set<string>;
    indexChangedBetween: (prev: string, curr: string) => boolean;
  },
): Promise<{ findings: Finding[]; artifact: null }> {
  const findings: Finding[] = [];
  const entries = parseChangelogEntries(changelogContent);

  // Drift 1: missing git tag for declared release.
  for (const entry of entries) {
    if (entry.version === "Unreleased") continue;
    const expectedTag = `v${entry.version}`;
    if (!opts.tagList.has(expectedTag)) {
      findings.push(
        makeChangelogFinding(
          "missing-git-tag",
          opts.changelogRelPath,
          entry.headingLine,
          `CHANGELOG declares \`[${entry.version}]\` but no matching git tag \`${expectedTag}\` exists`,
          "medium",
        ),
      );
    }
  }

  // Drift 2: silent surface change between consecutive released tags.
  const released = entries.filter((e) => e.version !== "Unreleased");
  for (let i = 0; i < released.length - 1; i++) {
    const curr = released[i];
    const prev = released[i + 1];
    if (
      !opts.tagList.has(`v${curr.version}`) ||
      !opts.tagList.has(`v${prev.version}`)
    ) {
      continue;
    }
    const indexChanged = opts.indexChangedBetween(
      `v${prev.version}`,
      `v${curr.version}`,
    );
    if (indexChanged && entryBodyIsThin(curr.body)) {
      findings.push(
        makeChangelogFinding(
          "silent-surface-change",
          opts.changelogRelPath,
          curr.headingLine,
          `\`src/index.ts\` was modified between v${prev.version} and v${curr.version} but the CHANGELOG entry for ${curr.version} is short — public-surface change may be undocumented`,
          "low",
        ),
      );
    }
  }

  findings.sort((a, b) => a.id.localeCompare(b.id));
  return { findings, artifact: null };
}

// ---------------------------------------------------------------------------
// Parsing
// ---------------------------------------------------------------------------

export interface ChangelogEntry {
  /** Version string without brackets ("1.0.0", "Unreleased"). */
  version: string;
  /** Date string from the heading, or null if absent. */
  date: string | null;
  /** 1-indexed line of the `## [X.Y.Z]` heading. */
  headingLine: number;
  /** Lines under the heading, excluding the next heading. */
  body: string;
}

/**
 * Parse the changelog into discrete entries. Heading format:
 *   `## [X.Y.Z] - YYYY-MM-DD` or `## [Unreleased] - YYYY-MM-DD`
 */
export function parseChangelogEntries(content: string): ChangelogEntry[] {
  const lines = content.split(/\r?\n/);
  const entries: ChangelogEntry[] = [];
  let current: ChangelogEntry | null = null;
  const HEADING = /^##\s+\[([^\]]+)\](?:\s+-\s+(\S+))?/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const m = HEADING.exec(line);
    if (m) {
      if (current) entries.push(current);
      current = {
        version: m[1],
        date: m[2] ?? null,
        headingLine: i + 1,
        body: "",
      };
    } else if (current) {
      current.body += (current.body ? "\n" : "") + line;
    }
  }
  if (current) entries.push(current);
  return entries;
}

/**
 * Heuristic: an entry body is "thin" if, after stripping markdown
 * cruft (headings, bullets, blank lines), it has fewer than 80
 * characters of meaningful prose. Below that threshold and given a
 * surface change in the same range, we flag for human review.
 */
function entryBodyIsThin(body: string): boolean {
  const stripped = body
    .split(/\r?\n/)
    .filter((l) => l.trim().length > 0)
    .filter((l) => !/^#{1,6}\s/.test(l))
    .map((l) => l.replace(/^[-*+]\s+/, "").replace(/\s+/g, " "))
    .join(" ");
  return stripped.length < 80;
}

// ---------------------------------------------------------------------------
// Finding construction
// ---------------------------------------------------------------------------

function makeChangelogFinding(
  flavor: "missing-git-tag" | "silent-surface-change",
  fileRel: string,
  startLine: number,
  message: string,
  severity: "low" | "medium" | "high",
): Finding {
  const location = { file: fileRel, start_line: startLine, end_line: startLine };
  // `missing-git-tag` is TRIVIAL: it's resolved by either a single
  // CHANGELOG edit (demote/remove the entry) or a single git tag
  // command. No code change, no behavior change.
  // `silent-surface-change` is NON-TRIVIAL: requires inspecting the
  // diff between two tags and adding informed CHANGELOG text.
  const isTrivial = flavor === "missing-git-tag";
  return {
    id: computeFindingId({
      category: "changelog",
      principle: null,
      location,
      message,
    }),
    category: "changelog",
    principle: null,
    location,
    severity,
    classification: isTrivial ? "trivial" : "non-trivial",
    message,
    details: null,
    remediation: isTrivial
      ? {
          kind: "in-pr",
          description: `Add the missing git tag (\`git tag vX.Y.Z <commit-sha>\` for the release commit) OR demote the CHANGELOG entry from \`##\` to \`###\` under a non-versioned parent heading (e.g., "Pre-tagging early development") to acknowledge it as historical rather than a released version.`,
        }
      : {
          kind: "task",
          proposed_approach: `Audit the diff between the two tags (\`git diff <prev>..<curr> -- src/index.ts\`) and add a CHANGELOG entry describing every public-API change found.`,
          version_impact: "none",
        },
    variants: null,
  };
}
