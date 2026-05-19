/**
 * Audit module: documentation accuracy (US3, T020).
 *
 * Cross-checks README.md against the SDK's actual exports and the
 * `examples/` directory:
 *
 *   1. **Resources-table cross-check** (highest-value drift detector):
 *      parse the `## Resources` markdown table; build a set of
 *      `(resource, method)` pairs documented in the README; diff
 *      against the introspected set from `getResourceClasses`. Surface
 *      two finding kinds: `documented-but-absent` (README mentions a
 *      method that doesn't exist) and `present-but-undocumented`
 *      (method exists but README doesn't list it).
 *
 *   2. **Snippet identifier cross-check**: extract `client.X.Y(...)`
 *      patterns from fenced code blocks in README; flag any pair that
 *      doesn't resolve to a real `(resource, method)` on the client.
 *      Lighter than full snippet type-checking but catches the common
 *      "method renamed but README still uses old name" drift.
 *
 *   3. **Examples directory type-check** is intentionally NOT performed
 *      yet: every file under `examples/` carries `// @ts-nocheck` (the
 *      examples target Deno, not the SDK's tsc), so semantic type-check
 *      would be a no-op. Filed as a future enhancement remediation task.
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import ts from "typescript";

import type {
  AuditContext,
  AuditModule,
  Finding,
} from "./audit-lib/types.js";
import {
  loadProgram,
  getResourceClasses,
  type ExtractedResource,
} from "./audit-lib/ast.js";
import { computeFindingId } from "./audit-lib/findings.js";
import { toPosixPath } from "./audit-lib/render.js";

// ---------------------------------------------------------------------------
// Production entry
// ---------------------------------------------------------------------------

export const runDocs: AuditModule<null> = async (ctx) => {
  const readmePath = resolve(ctx.repoRoot, "README.md");
  if (!existsSync(readmePath)) {
    return { findings: [], artifact: null };
  }
  const readme = readFileSync(readmePath, "utf8");

  const program = loadProgram(resolve(ctx.repoRoot, "tsconfig.json"));
  const extracted = getResourceClasses(
    program,
    resolve(ctx.repoRoot, "src/resources"),
  );

  return runDocsAgainst(readme, extracted, ctx, {
    readmeRelPath: toPosixPath(readmePath, ctx.repoRoot),
  });
};

/**
 * Test-friendly entry: callers supply the README contents + extracted
 * resources directly, so tests can bypass real file I/O and Program loading.
 */
export async function runDocsAgainst(
  readmeContent: string,
  extracted: ExtractedResource[],
  ctx: AuditContext,
  opts: { readmeRelPath: string },
): Promise<{ findings: Finding[]; artifact: null }> {
  const findings: Finding[] = [];
  const actual = buildActualPairs(extracted);
  const documented = parseResourceTable(readmeContent);

  // Drift 1: documented-but-absent
  for (const [resource, methods] of documented) {
    const actualMethods = actual.get(resource);
    if (!actualMethods) {
      findings.push(
        makeDocFinding(
          "documented-but-absent",
          opts.readmeRelPath,
          0,
          `README lists resource \`${resource}\` but it isn't exported by TeamleaderFocusClient`,
          "high",
        ),
      );
      continue;
    }
    for (const method of methods) {
      if (!actualMethods.has(method)) {
        findings.push(
          makeDocFinding(
            "documented-but-absent",
            opts.readmeRelPath,
            0,
            `README lists \`${resource}.${method}\` but it doesn't exist on the resource`,
            "high",
          ),
        );
      }
    }
  }

  // Drift 2: present-but-undocumented
  for (const [resource, methods] of actual) {
    const documentedMethods = documented.get(resource);
    if (!documentedMethods) {
      findings.push(
        makeDocFinding(
          "present-but-undocumented",
          opts.readmeRelPath,
          0,
          `Resource \`${resource}\` is exported but not listed in the README Resources table`,
          "medium",
        ),
      );
      continue;
    }
    for (const method of methods) {
      if (!documentedMethods.has(method)) {
        findings.push(
          makeDocFinding(
            "present-but-undocumented",
            opts.readmeRelPath,
            0,
            `\`${resource}.${method}\` exists but isn't listed in the README Resources table`,
            "medium",
          ),
        );
      }
    }
  }

  // Drift 3: snippet identifier mismatches
  for (const snippet of extractTsSnippets(readmeContent)) {
    for (const ref of extractClientCalls(snippet.code)) {
      const actualMethods = actual.get(ref.resource);
      if (!actualMethods || !actualMethods.has(ref.method)) {
        findings.push(
          makeDocFinding(
            "snippet-broken",
            opts.readmeRelPath,
            snippet.startLine,
            `README code snippet references \`client.${ref.resource}.${ref.method}\` but ${
              !actualMethods ? "the resource doesn't exist" : "the method doesn't exist on this resource"
            }`,
            "high",
          ),
        );
      }
    }
  }

  findings.sort((a, b) => a.id.localeCompare(b.id));
  return { findings, artifact: null };
}

// ---------------------------------------------------------------------------
// README parsing
// ---------------------------------------------------------------------------

/**
 * Parse the `## Resources` markdown table out of README content.
 * Returns Map<resource, Set<method>>; resource and method names are
 * the bare identifiers stripped of their backticks.
 */
export function parseResourceTable(content: string): Map<string, Set<string>> {
  const out = new Map<string, Set<string>>();
  const lines = content.split(/\r?\n/);

  let inTable = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!inTable) {
      if (/^##\s+Resources\s*$/.test(line)) {
        inTable = true;
      }
      continue;
    }

    if (line.startsWith("## ") || line.startsWith("# ")) break; // next section
    if (!line.startsWith("|")) continue;
    if (/^\|\s*-+\s*\|/.test(line)) continue; // separator
    if (/^\|\s*Resource\s*\|\s*Methods\s*\|/i.test(line)) continue; // header

    const cells = line.split("|").map((c) => c.trim()).filter((c, idx, arr) => {
      return !(idx === 0 && c === "") && !(idx === arr.length - 1 && c === "");
    });
    if (cells.length < 2) continue;

    const resource = stripBackticks(cells[0]);
    if (!resource) continue;

    const methods = new Set<string>();
    for (const m of cells[1].matchAll(/`([^`]+)`/g)) {
      methods.add(m[1]);
    }
    out.set(resource, methods);
  }

  return out;
}

function stripBackticks(s: string): string {
  return s.replace(/^`|`$/g, "").trim();
}

interface ExtractedSnippet {
  code: string;
  startLine: number;
}

/** Pull every ```typescript / ```ts fenced block out of markdown. */
export function extractTsSnippets(content: string): ExtractedSnippet[] {
  const snippets: ExtractedSnippet[] = [];
  const lines = content.split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const open = /^```(?:typescript|ts)\s*$/.exec(line);
    if (open) {
      const startLine = i + 1;
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      snippets.push({ code: buf.join("\n"), startLine });
    }
    i++;
  }
  return snippets;
}

/**
 * Extract `<varname>.<resource>.<method>(...)` patterns from snippet text.
 * Matches both `client.X.Y(` and `teamleader.X.Y(` — the two binding
 * names the README uses interchangeably.
 */
export function extractClientCalls(
  code: string,
): Array<{ resource: string; method: string }> {
  const out: Array<{ resource: string; method: string }> = [];
  const re = /\b(?:client|teamleader)\.([A-Za-z_$][\w$]*)\.([A-Za-z_$][\w$]*)\s*\(/g;
  for (const m of code.matchAll(re)) {
    out.push({ resource: m[1], method: m[2] });
  }
  return out;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildActualPairs(
  extracted: ExtractedResource[],
): Map<string, Set<string>> {
  const out = new Map<string, Set<string>>();
  for (const r of extracted) {
    const resourceName = deriveResourceName(r.class_name);
    out.set(resourceName, new Set(r.methods.map((m) => m.name)));
  }
  return out;
}

function deriveResourceName(className: string): string {
  const stripped = className.endsWith("Resource")
    ? className.slice(0, -"Resource".length)
    : className;
  if (stripped.length === 0) return stripped;
  return stripped[0].toLowerCase() + stripped.slice(1);
}

function makeDocFinding(
  flavor:
    | "documented-but-absent"
    | "present-but-undocumented"
    | "snippet-broken",
  fileRel: string,
  startLine: number,
  message: string,
  severity: "low" | "medium" | "high",
): Finding {
  const location = { file: fileRel, start_line: startLine, end_line: startLine };
  return {
    id: computeFindingId({
      category: "documentation",
      principle: null,
      location,
      message,
    }),
    category: "documentation",
    principle: null,
    location,
    severity,
    classification: flavor === "snippet-broken" ? "trivial" : "non-trivial",
    message,
    details: null,
    remediation:
      flavor === "documented-but-absent"
        ? {
            kind: "task",
            proposed_approach: `Remove the stale README entry, or restore the documented symbol if it was removed unintentionally.`,
            version_impact: "patch",
          }
        : flavor === "present-but-undocumented"
        ? {
            kind: "task",
            proposed_approach: `Add the missing entry to the README Resources table (or document the omission in the snippet's surrounding text if it's intentional).`,
            version_impact: "patch",
          }
        : {
            kind: "in-pr",
            description: `Update the README snippet to reference an existing client method.`,
          },
    variants: null,
  };
}

void ts;
