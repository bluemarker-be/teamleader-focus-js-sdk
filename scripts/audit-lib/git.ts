/**
 * Thin wrapper around git invocations needed by audit modules.
 *
 * Uses execFileSync (NOT shell exec) with arguments passed as an argv
 * array, so refs and paths can never be interpreted as shell syntax.
 * All ref-shaped inputs are validated against a strict regex first.
 *
 * Lives in audit-lib/ so multiple audit modules can share one path
 * for git access (currently only audit-changelog; future modules
 * doing per-tag AST diffs will use it too).
 */

import { execFileSync } from "node:child_process";

const SAFE_REF = /^[A-Za-z0-9_./@^~:-]+$/;

/** All tags in the repository, as an unordered set. */
export function gitTagList(repoRoot: string): Set<string> {
  const stdout = execFileSync("git", ["tag", "--list"], {
    cwd: repoRoot,
    encoding: "utf8",
  });
  return new Set(stdout.split("\n").map((l) => l.trim()).filter(Boolean));
}

/**
 * True iff `path` was modified between `prev` and `curr` (both refs).
 * Returns false on any git error (the change is unknowable; don't flag).
 */
export function gitFileChanged(
  repoRoot: string,
  prev: string,
  curr: string,
  path: string,
): boolean {
  for (const ref of [prev, curr]) {
    if (!SAFE_REF.test(ref)) {
      throw new Error(`unsafe git ref: ${JSON.stringify(ref)}`);
    }
  }
  try {
    const stdout = execFileSync(
      "git",
      ["diff", "--name-only", `${prev}..${curr}`, "--", path],
      { cwd: repoRoot, encoding: "utf8" },
    );
    return stdout.trim().length > 0;
  } catch {
    return false;
  }
}
