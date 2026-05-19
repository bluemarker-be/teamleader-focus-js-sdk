/**
 * Audit orchestrator. Entry point for `npm run audit`.
 *
 * CLI contract: specs/001-sdk-quality-audit/contracts/audit-cli.md
 *
 * Responsibilities:
 *   1. Parse CLI flags (--only, --fail-on, --quiet, --help).
 *   2. Load the audit context (git SHA, branch, repo root, feature dir).
 *   3. Dispatch to each registered audit module (or just the one named
 *      by --only).
 *   4. Aggregate findings into a single ordered list.
 *   5. Write findings.{md,json} under the feature directory.
 *   6. Exit per CLI contract (0 nominal; 1 if --fail-on threshold crossed;
 *      2 on internal error).
 *
 * Module stubs return empty findings until per-story modules are wired
 * in (T010, T015, T020, T021). The orchestrator is end-to-end runnable
 * at every story checkpoint.
 */

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import type {
  AuditContext,
  AuditModule,
  AuditModuleName,
  AuditModuleResult,
  ComplianceReport,
  ConsistencyMatrix,
  Finding,
  FindingsFile,
  Severity,
} from "./audit-lib/types.js";
import { stableStringify } from "./audit-lib/render.js";
import {
  runConsistency,
  renderConsistencyMatrixMd,
} from "./audit-consistency.js";
import {
  runCompliance,
  renderComplianceReportMd,
} from "./audit-compliance.js";

const MODULE_NAMES: readonly AuditModuleName[] = [
  "consistency",
  "compliance",
  "docs",
  "changelog",
] as const;

type FailOnSeverity = Severity | "none";

interface CliArgs {
  only: AuditModuleName | null;
  failOn: FailOnSeverity;
  quiet: boolean;
  help: boolean;
}

// ---------------------------------------------------------------------------
// Module registry. Stubs are replaced by real implementations as each
// per-story module lands (T015 → compliance, T020 → docs, T021 → changelog).
// ---------------------------------------------------------------------------

const stubModule: AuditModule = async (_ctx) => ({
  findings: [],
  artifact: null,
});

const MODULES: Record<AuditModuleName, AuditModule> = {
  consistency: runConsistency,
  compliance: runCompliance,
  docs: stubModule,
  changelog: stubModule,
};

/**
 * Per-module artifact writer. Modules that produce a typed artifact
 * (consistency, compliance) write a paired `<name>.md` + `<name>.json`
 * under the feature directory. Modules that only contribute findings
 * (docs, changelog) have `null` here.
 */
const ARTIFACT_WRITERS: Record<
  AuditModuleName,
  | { filename: string; renderMd: (artifact: unknown) => string }
  | null
> = {
  consistency: {
    filename: "consistency-matrix",
    renderMd: (a) => renderConsistencyMatrixMd(a as ConsistencyMatrix),
  },
  compliance: {
    filename: "compliance-report",
    renderMd: (a) => renderComplianceReportMd(a as ComplianceReport),
  },
  docs: null,
  changelog: null,
};

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const ctx = await loadContext();
  const moduleResults = new Map<AuditModuleName, AuditModuleResult>();

  for (const name of MODULE_NAMES) {
    if (args.only && args.only !== name) continue;
    const result = await MODULES[name](ctx);
    moduleResults.set(name, result);
    writeArtifactIfPresent(name, result, ctx);
    if (!args.quiet) {
      const summary = summarizeSeverities(result.findings);
      console.log(`[audit] ${name.padEnd(13)} … ${result.findings.length} findings${summary}`);
    }
  }

  const allFindings = [...moduleResults.values()]
    .flatMap((r) => r.findings)
    .sort((a, b) => a.id.localeCompare(b.id));

  writeFindings(allFindings, ctx);
  if (!args.quiet) {
    console.log(`[audit] wrote findings.{md,json} to ${featureDirRel()}`);
  }

  if (args.failOn !== "none") {
    const unresolved = allFindings.filter(
      (f) =>
        severityRank(f.severity) >= severityRank(args.failOn as Severity) &&
        f.remediation.kind === "task",
    );
    if (unresolved.length > 0) {
      if (!args.quiet) {
        console.log(
          `[audit] exit 1: ${unresolved.length} unresolved finding(s) at severity >= ${args.failOn}`,
        );
      }
      process.exit(1);
    }
  }
}

// ---------------------------------------------------------------------------
// CLI parsing
// ---------------------------------------------------------------------------

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = {
    only: null,
    failOn: "none",
    quiet: false,
    help: false,
  };
  for (const a of argv) {
    if (a === "--help" || a === "-h") args.help = true;
    else if (a === "--quiet") args.quiet = true;
    else if (a.startsWith("--only=")) {
      const v = a.slice("--only=".length);
      if (!isAuditModuleName(v)) {
        die(2, `unknown module for --only: "${v}" (expected: ${MODULE_NAMES.join("|")})`);
      }
      args.only = v;
    } else if (a.startsWith("--fail-on=")) {
      const v = a.slice("--fail-on=".length);
      if (!isFailOnSeverity(v)) {
        die(2, `unknown severity for --fail-on: "${v}" (expected: none|low|medium|high)`);
      }
      args.failOn = v;
    } else {
      die(2, `unknown argument: "${a}"`);
    }
  }
  return args;
}

function isAuditModuleName(v: string): v is AuditModuleName {
  return (MODULE_NAMES as readonly string[]).includes(v);
}

function isFailOnSeverity(v: string): v is FailOnSeverity {
  return v === "none" || v === "low" || v === "medium" || v === "high";
}

function printHelp(): void {
  console.log(`npm run audit -- [--only=<module>] [--fail-on=<severity>] [--quiet]

Modules: ${MODULE_NAMES.join(", ")}
Severities: none (default), low, medium, high

See specs/001-sdk-quality-audit/contracts/audit-cli.md for the full contract.`);
}

// ---------------------------------------------------------------------------
// Context loading
// ---------------------------------------------------------------------------

async function loadContext(): Promise<AuditContext> {
  const repoRoot = process.cwd();
  const sha = git(repoRoot, "rev-parse", "HEAD");
  const branch = git(repoRoot, "rev-parse", "--abbrev-ref", "HEAD");
  return { sha, branch, repoRoot };
}

function git(cwd: string, ...gitArgs: string[]): string {
  for (const a of gitArgs) {
    if (!/^[A-Za-z0-9_./@^~:-]+$/.test(a)) {
      die(2, `unsafe git argument: ${JSON.stringify(a)}`);
    }
  }
  try {
    return execFileSync("git", gitArgs, { cwd, encoding: "utf8" }).trim();
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    die(2, `git ${gitArgs.join(" ")} failed: ${msg}`);
  }
}

// ---------------------------------------------------------------------------
// Output writing
// ---------------------------------------------------------------------------

const FEATURE_DIR_REL = "specs/001-sdk-quality-audit";

function featureDirRel(): string {
  return FEATURE_DIR_REL;
}

function featureDirAbs(repoRoot: string): string {
  return resolve(repoRoot, FEATURE_DIR_REL);
}

function writeFindings(findings: Finding[], ctx: AuditContext): void {
  const dir = featureDirAbs(ctx.repoRoot);
  if (!existsSync(dir)) {
    die(2, `feature dir missing: ${dir}`);
  }
  const file: FindingsFile = {
    sha: ctx.sha,
    generated_for_branch: ctx.branch,
    schema_version: "1",
    findings,
  };
  writeFileSync(resolve(dir, "findings.json"), stableStringify(file) + "\n");
  writeFileSync(resolve(dir, "findings.md"), renderFindingsMd(file));
}

function writeArtifactIfPresent(
  name: AuditModuleName,
  result: AuditModuleResult,
  ctx: AuditContext,
): void {
  const writer = ARTIFACT_WRITERS[name];
  if (!writer || result.artifact === null) return;
  const dir = featureDirAbs(ctx.repoRoot);
  writeFileSync(
    resolve(dir, `${writer.filename}.json`),
    stableStringify(result.artifact) + "\n",
  );
  writeFileSync(
    resolve(dir, `${writer.filename}.md`),
    writer.renderMd(result.artifact),
  );
}

function renderFindingsMd(file: FindingsFile): string {
  const lines: string[] = [
    `# Audit Findings`,
    ``,
    `**Branch**: \`${file.generated_for_branch}\` · **SHA**: \`${file.sha}\``,
    ``,
    `Total findings: **${file.findings.length}**`,
    ``,
  ];
  if (file.findings.length === 0) {
    lines.push(`*No findings. The codebase satisfies every audit dimension at this commit.*`);
    lines.push("");
    return lines.join("\n");
  }
  for (const category of ["consistency", "principle-compliance", "documentation", "changelog"] as const) {
    const inCategory = file.findings.filter((f) => f.category === category);
    if (inCategory.length === 0) continue;
    lines.push(`## ${category} (${inCategory.length})`, "");
    for (const sev of ["high", "medium", "low"] as const) {
      const inSev = inCategory.filter((f) => f.severity === sev);
      if (inSev.length === 0) continue;
      lines.push(`### ${sev}`, "");
      for (const f of inSev) {
        const loc = `${f.location.file}${f.location.start_line ? `:${f.location.start_line}` : ""}`;
        const classification = f.classification === "trivial" ? "trivial" : "**non-trivial**";
        const remediation = f.remediation.kind === "in-pr"
          ? `in-PR: ${f.remediation.description}`
          : `task (${f.remediation.version_impact}): ${f.remediation.proposed_approach}`;
        lines.push(`- **${f.id}** \`${loc}\` — ${f.message} (${classification}; ${remediation})`);
      }
      lines.push("");
    }
  }
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function summarizeSeverities(findings: Finding[]): string {
  if (findings.length === 0) return "";
  const counts: Record<Severity, number> = { high: 0, medium: 0, low: 0 };
  for (const f of findings) counts[f.severity]++;
  const parts: string[] = [];
  if (counts.high) parts.push(`${counts.high} high`);
  if (counts.medium) parts.push(`${counts.medium} medium`);
  if (counts.low) parts.push(`${counts.low} low`);
  return ` (${parts.join(", ")})`;
}

function severityRank(s: Severity): number {
  return { low: 1, medium: 2, high: 3 }[s];
}

function die(code: 1 | 2, message: string): never {
  console.error(`[audit] ${message}`);
  process.exit(code);
}

// Used during testing to silence the unused-import warning on readFileSync.
void readFileSync;

main().catch((err) => {
  console.error("[audit] internal error:", err);
  process.exit(2);
});
