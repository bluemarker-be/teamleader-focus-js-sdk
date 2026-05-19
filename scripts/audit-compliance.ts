/**
 * Audit module: constitution-principle compliance (US2).
 *
 * Walks every audited file under src/, scripts/, tests/, and the project
 * config set; evaluates each against the six principles ratified in
 * `.specify/memory/constitution.md`; produces a ComplianceReport plus
 * one Finding per `partial` or `no` cell.
 *
 * Principle applicability:
 *
 *   I.   Spec-Generated Types — applies only to `src/types/generated.ts`
 *        (checks the file carries the "do not edit" generator header).
 *   II.  Strict Semver Post-1.0 — n/a per-file (release-level discipline).
 *   III. Multi-Runtime Portability — applies to `src/**`; flags any
 *        `node:*` import (or other Node-only specifier).
 *   IV.  Zero Runtime Dependencies — applies only to `package.json`;
 *        the `dependencies` object must be empty.
 *   V.   Typed Errors — applies to `src/**`; every `throw new X(...)`
 *        must construct a `TeamleaderFocus*` subclass.
 *   VI.  Live Integration Verification — applies to `src/resources/*.ts`;
 *        each resource's methods must appear in the integration test
 *        suite (consumed via `verify-endpoints --json` payload), unless
 *        documented in the `INTENTIONALLY_SKIPPED` exemption list.
 */

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";

import ts from "typescript";

import type {
  AuditContext,
  AuditModule,
  ComplianceCells,
  ComplianceReport,
  ComplianceRow,
  Finding,
  Principle,
  Severity,
  Verdict,
} from "./audit-lib/types.js";
import {
  loadProgram,
  getImports,
  getThrowSites,
  type ExtractedImport,
  type ExtractedThrow,
} from "./audit-lib/ast.js";
import { computeFindingId } from "./audit-lib/findings.js";
import { toPosixPath } from "./audit-lib/render.js";

// ---------------------------------------------------------------------------
// verify-endpoints --json payload contract (T013)
// ---------------------------------------------------------------------------

export interface VerifyEndpointsPayload {
  schema_version: "1";
  endpoints_total: number;
  exempted: Array<{ endpoint: string; reason: string }>;
  missing_live_coverage: Array<{
    endpoint: string;
    operation_id: string;
    resource: string;
    method: string;
  }>;
  missing_sdk_method: Array<{ endpoint: string; operation_id: string }>;
}

// ---------------------------------------------------------------------------
// Production entry point
// ---------------------------------------------------------------------------

export const runCompliance: AuditModule<ComplianceReport> = async (ctx) => {
  const program = loadProgram(resolve(ctx.repoRoot, "tsconfig.json"));
  const auditedFiles = enumerateAuditedFiles(ctx.repoRoot);
  const verifyPayload = invokeVerifyEndpoints(ctx.repoRoot);
  return runComplianceAgainst(auditedFiles, program, verifyPayload, ctx);
};

/**
 * Test-friendly entry: callers supply their own file list, ts.Program,
 * and verify-endpoints payload. Lets unit tests bypass the real SDK +
 * subprocess invocation and operate on synthetic fixtures.
 */
export async function runComplianceAgainst(
  filesAbs: string[],
  program: ts.Program,
  verifyPayload: VerifyEndpointsPayload,
  ctx: AuditContext,
): Promise<{ findings: Finding[]; artifact: ComplianceReport }> {
  const findings: Finding[] = [];
  const rows: ComplianceRow[] = [];

  for (const fileAbs of filesAbs) {
    const fileRel = toPosixPath(fileAbs, ctx.repoRoot);
    const { cells, fileFindings } = evaluateFile(
      fileAbs,
      fileRel,
      program,
      verifyPayload,
    );
    rows.push({
      file: fileRel,
      cells,
      finding_ids: fileFindings.map((f) => f.id),
    });
    findings.push(...fileFindings);
  }

  // Stable ordering (FR-009).
  rows.sort((a, b) => a.file.localeCompare(b.file));
  findings.sort((a, b) => a.id.localeCompare(b.id));

  const report: ComplianceReport = {
    sha: ctx.sha,
    generated_for_branch: ctx.branch,
    schema_version: "1",
    rows,
  };
  return { findings, artifact: report };
}

// ---------------------------------------------------------------------------
// Per-file evaluation
// ---------------------------------------------------------------------------

function evaluateFile(
  fileAbs: string,
  fileRel: string,
  program: ts.Program,
  verifyPayload: VerifyEndpointsPayload,
): { cells: ComplianceCells; fileFindings: Finding[] } {
  const cells: ComplianceCells = {
    I: "n/a",
    II: "n/a",
    III: "n/a",
    IV: "n/a",
    V: "n/a",
    VI: "n/a",
  };
  const fileFindings: Finding[] = [];

  const isSrc = fileRel.startsWith("src/");
  const isGenerated = fileRel === "src/types/generated.ts";
  const isPackageJson =
    fileRel === "package.json" || fileRel.endsWith("/package.json");
  const isResource =
    fileRel.startsWith("src/resources/") && fileRel !== "src/resources/base.ts";

  // ── Principle I: spec-generated types ────────────────────────────────────
  if (isGenerated) {
    const ok = isGeneratedFile(fileAbs);
    cells.I = ok ? "yes" : "no";
    if (!ok) {
      fileFindings.push(
        makePrincipleFinding(
          "I",
          fileRel,
          0,
          "generated.ts missing the auto-generation header — file may have been hand-edited",
          "high",
          "non-trivial",
          "Regenerate via `npm run generate`; if a customization is needed, add it as a patch in scripts/generate-types.ts (constitution principle I).",
          "major",
        ),
      );
    }
  }

  // ── Principles III + V: src/ analysis (one ts.SourceFile each) ───────────
  if (isSrc) {
    const sourceFile = program.getSourceFile(fileAbs);
    if (sourceFile) {
      const importViolations = findBadImports(getImports(sourceFile));
      cells.III = importViolations.length === 0 ? "yes" : "no";
      for (const v of importViolations) {
        fileFindings.push(
          makePrincipleFinding(
            "III",
            fileRel,
            v.line,
            `Node-only import "${v.module}" — would break Deno / Edge Function deployments`,
            "high",
            "non-trivial",
            `Replace with the Web Standard equivalent (fetch, crypto.subtle, TextEncoder, etc.) or move the file out of src/.`,
            "patch",
          ),
        );
      }

      const throwViolations = findBareThrows(getThrowSites(sourceFile));
      cells.V = throwViolations.length === 0 ? "yes" : "no";
      for (const v of throwViolations) {
        fileFindings.push(
          makePrincipleFinding(
            "V",
            fileRel,
            v.line,
            `Bare \`throw new ${v.ctor_class_name || "Error"}(...)\` — should construct a TeamleaderFocus* subclass`,
            "medium",
            "non-trivial",
            `Replace with the appropriate TeamleaderFocus* subclass so consumers can pattern-match on error identity (constitution principle V).`,
            "minor",
          ),
        );
      }
    }
  }

  // ── Principle IV: zero runtime dependencies ──────────────────────────────
  if (isPackageJson) {
    const deps = readDependencies(fileAbs);
    cells.IV = deps.length === 0 ? "yes" : "no";
    if (deps.length > 0) {
      fileFindings.push(
        makePrincipleFinding(
          "IV",
          fileRel,
          0,
          `package.json declares ${deps.length} runtime dependenc${deps.length === 1 ? "y" : "ies"}: ${deps.join(", ")}`,
          "high",
          "non-trivial",
          `Remove the dependency or implement the capability in-house. If the dependency is genuinely necessary, escalate as a constitution amendment (principle IV).`,
          "major",
        ),
      );
    }
  }

  // ── Principle VI: live integration verification ──────────────────────────
  if (isResource) {
    const resourceName = deriveResourceNameFromPath(fileRel);
    const missing = verifyPayload.missing_live_coverage.filter(
      (m) => m.resource === resourceName,
    );
    if (missing.length === 0) {
      cells.VI = "yes";
    } else {
      cells.VI = "partial";
      for (const m of missing) {
        fileFindings.push(
          makePrincipleFinding(
            "VI",
            fileRel,
            0,
            `${resourceName}.${m.method} (${m.endpoint}) has no live integration test`,
            "medium",
            "trivial",
            `Add a live integration test for ${m.endpoint} under tests/integration/, or — if the endpoint is unsafe to exercise against a production tenant — add it to scripts/verify-endpoints.ts INTENTIONALLY_SKIPPED with a reason.`,
            "patch",
          ),
        );
      }
    }
  }

  return { cells, fileFindings };
}

// ---------------------------------------------------------------------------
// Principle evaluators
// ---------------------------------------------------------------------------

/**
 * Check that a "this file is generated, don't hand-edit" header is
 * present near the top. We don't verify the *contents* are current —
 * `npm run generate`'s drift check covers that. We just confirm the
 * file isn't a hand-rolled type module that happens to share the path.
 *
 * Matches a permissive set of phrases case-insensitively so a future
 * header rewrite doesn't silently start false-positiving every audit.
 */
export function isGeneratedFile(fileAbs: string): boolean {
  const head = readFileSync(fileAbs, "utf8").slice(0, 1200).toLowerCase();
  return (
    head.includes("openapi-typescript") ||
    head.includes("auto-generated") ||
    head.includes("autogenerated") ||
    head.includes("do not edit") ||
    head.includes("do not make direct changes")
  );
}

/** Imports that violate principle III (multi-runtime portability). */
export function findBadImports(
  imports: ExtractedImport[],
): ExtractedImport[] {
  return imports.filter((i) => isNodeOnlyImport(i.module));
}

function isNodeOnlyImport(specifier: string): boolean {
  if (specifier.startsWith("node:")) return true;
  // Bare Node built-ins (without `node:` prefix). Conservative list.
  const BARE_NODE_BUILTINS = new Set([
    "fs",
    "path",
    "url",
    "crypto",
    "child_process",
    "os",
    "stream",
    "buffer",
    "util",
    "process",
    "http",
    "https",
    "net",
    "tls",
    "dns",
    "events",
    "zlib",
  ]);
  return BARE_NODE_BUILTINS.has(specifier);
}

/** Throw sites that violate principle V (typed errors). */
export function findBareThrows(throws: ExtractedThrow[]): ExtractedThrow[] {
  return throws.filter((t) => !isTypedErrorCtor(t.ctor_class_name));
}

function isTypedErrorCtor(name: string): boolean {
  if (!name) return false;
  return name.startsWith("TeamleaderFocus") || name.startsWith("Teamleader");
}

/** Returns the names of declared runtime dependencies in a package.json. */
export function readDependencies(fileAbs: string): string[] {
  const raw = readFileSync(fileAbs, "utf8");
  const parsed: { dependencies?: Record<string, string> } = JSON.parse(raw);
  const deps = parsed.dependencies ?? {};
  return Object.keys(deps).sort();
}

// ---------------------------------------------------------------------------
// File enumeration + helpers
// ---------------------------------------------------------------------------

function enumerateAuditedFiles(repoRoot: string): string[] {
  const out: string[] = [];

  const srcDir = resolve(repoRoot, "src");
  if (existsSync(srcDir)) out.push(...listTsFiles(srcDir));

  const scriptsDir = resolve(repoRoot, "scripts");
  if (existsSync(scriptsDir)) out.push(...listTsFiles(scriptsDir));

  for (const name of [
    "package.json",
    "tsconfig.json",
    "vitest.config.ts",
    "vitest.integration.config.ts",
  ]) {
    const p = resolve(repoRoot, name);
    if (existsSync(p)) out.push(p);
  }

  return out;
}

function listTsFiles(dirAbs: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dirAbs)) {
    const full = resolve(dirAbs, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...listTsFiles(full));
    else if (entry.endsWith(".ts") && !entry.endsWith(".d.ts")) out.push(full);
    else if (entry.endsWith(".json")) out.push(full);
  }
  return out;
}

function deriveResourceNameFromPath(fileRel: string): string {
  // src/resources/contacts.ts → contacts
  // src/resources/day-off-types.ts → dayOffTypes
  const base = fileRel.replace(/^src\/resources\//, "").replace(/\.ts$/, "");
  return kebabToCamel(base);
}

function kebabToCamel(s: string): string {
  return s.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

function invokeVerifyEndpoints(repoRoot: string): VerifyEndpointsPayload {
  // Invoke node directly (not via npm) so the script header doesn't
  // pollute stdout.
  const scriptPath = resolve(repoRoot, "scripts/verify-endpoints.ts");
  const stdout = execFileSync(
    process.execPath,
    ["--loader", "ts-node/esm", scriptPath, "--json"],
    {
      cwd: repoRoot,
      encoding: "utf8",
      maxBuffer: 50 * 1024 * 1024,
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  const parsed = JSON.parse(stdout) as VerifyEndpointsPayload;
  if (parsed.schema_version !== "1") {
    throw new Error(
      `verify-endpoints --json returned schema_version=${String(parsed.schema_version)}, expected "1"`,
    );
  }
  return parsed;
}

// ---------------------------------------------------------------------------
// Finding construction
// ---------------------------------------------------------------------------

function makePrincipleFinding(
  principle: Principle,
  fileRel: string,
  line: number,
  message: string,
  severity: Severity,
  classification: "trivial" | "non-trivial",
  remediationDescription: string,
  versionImpact: "none" | "patch" | "minor" | "major",
): Finding {
  const location = { file: fileRel, start_line: line, end_line: line };
  return {
    id: computeFindingId({
      category: "principle-compliance",
      principle,
      location,
      message,
    }),
    category: "principle-compliance",
    principle,
    location,
    severity,
    classification,
    message,
    details: null,
    remediation:
      classification === "trivial"
        ? { kind: "in-pr", description: remediationDescription }
        : {
            kind: "task",
            proposed_approach: remediationDescription,
            version_impact: versionImpact,
          },
    variants: null,
  };
}

// ---------------------------------------------------------------------------
// Markdown rendering
// ---------------------------------------------------------------------------

import { mdTable } from "./audit-lib/render.js";

const VERDICT_GLYPH: Record<Verdict, string> = {
  yes: "✓",
  partial: "~",
  no: "✗",
  "n/a": "·",
};

/**
 * Render the ComplianceReport as commit-ready markdown.
 *
 * Layout: header → summary stats → per-file × per-principle grid → a
 * legend explaining the glyphs. Findings are linked by ID footnote in
 * the grid rows that have any.
 */
export function renderComplianceReportMd(report: ComplianceReport): string {
  const summary = summarizeCells(report);
  const lines: string[] = [
    `# Compliance Report`,
    ``,
    `**Branch**: \`${report.generated_for_branch}\` · **SHA**: \`${report.sha}\``,
    ``,
    `Files audited: **${report.rows.length}** · ` +
      `${summary.yes} ✓ · ${summary.partial} ~ · ${summary.no} ✗ · ${summary.na} · (n/a)`,
    ``,
    `## Per-file × per-principle grid`,
    ``,
    mdTable(
      ["File", "I", "II", "III", "IV", "V", "VI", "Findings"],
      report.rows.map((r) => [
        r.file,
        VERDICT_GLYPH[r.cells.I],
        VERDICT_GLYPH[r.cells.II],
        VERDICT_GLYPH[r.cells.III],
        VERDICT_GLYPH[r.cells.IV],
        VERDICT_GLYPH[r.cells.V],
        VERDICT_GLYPH[r.cells.VI],
        r.finding_ids.join(", "),
      ]),
    ),
    ``,
    `## Legend`,
    ``,
    `- \`✓\` yes — file fully complies with the principle.`,
    `- \`~\` partial — file mostly complies but has one or more violations (see linked findings).`,
    `- \`✗\` no — file is in material violation of the principle (see linked findings).`,
    `- \`·\` n/a — the principle doesn't apply to this file (e.g., principle III multi-runtime portability doesn't apply to anything outside \`src/\`).`,
    ``,
    `## Principles`,
    ``,
    `- **I.   Spec-Generated Types** — only applies to \`src/types/generated.ts\` (must carry the auto-generation header; never hand-edited).`,
    `- **II.  Strict Semver Post-1.0** — release-level discipline; not per-file.`,
    `- **III. Multi-Runtime Portability** — applies to \`src/**\`; no \`node:*\` imports or Node-only globals.`,
    `- **IV.  Zero Runtime Dependencies** — applies to \`package.json\`; the \`dependencies\` object must be empty.`,
    `- **V.   Typed Errors** — applies to \`src/**\`; every \`throw\` must construct a \`TeamleaderFocus*\` subclass.`,
    `- **VI.  Live Integration Verification** — applies to \`src/resources/*.ts\`; every method must have a live integration test or a documented exemption.`,
    ``,
  ];

  return lines.join("\n");
}

function summarizeCells(report: ComplianceReport): {
  yes: number;
  partial: number;
  no: number;
  na: number;
} {
  let yes = 0,
    partial = 0,
    no = 0,
    na = 0;
  for (const r of report.rows) {
    for (const v of Object.values(r.cells)) {
      if (v === "yes") yes++;
      else if (v === "partial") partial++;
      else if (v === "no") no++;
      else na++;
    }
  }
  return { yes, partial, no, na };
}

/** Silence ts unused-import diagnostics for type-only callers. */
void ts;

/** Re-export the Verdict enum as a value so consumers can iterate. */
export const VERDICT_VALUES: readonly Verdict[] = ["yes", "partial", "no", "n/a"];
