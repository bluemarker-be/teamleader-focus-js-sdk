/**
 * Audit module: cross-resource surface consistency (US1).
 *
 * Builds the Consistency Matrix by introspecting every resource class
 * under `src/resources/` and produces one Finding per detected
 * divergence cluster.
 *
 * Three kinds of divergence are surfaced:
 *
 *   - **method_name**: synonym groups (e.g. `add` vs. `create`,
 *     `delete` vs. `remove`) — see NAME_SYNONYM_GROUPS below. The audit
 *     refuses to auto-arbitrate the canonical name per Q3 clarification;
 *     it lists every variant with occurrence counts and lets the reviewer
 *     decide during PR review.
 *   - **param_shape**: same method name, different parameter type
 *     shape (normalized so `RequestBody<"X.list">` vs.
 *     `RequestBody<"Y.list">` count as the *same* shape).
 *   - **return_envelope**: same method name, different return envelope
 *     (e.g. one resource's `update` returns `void`, another's returns
 *     `{ data: T }`).
 */

import { resolve } from "node:path";

import ts from "typescript";

import type {
  AuditContext,
  AuditModule,
  ConsistencyMatrix,
  DivergenceCluster,
  DivergenceVariant,
  DivergenceVariantOnFinding,
  Finding,
  MethodObservation,
  ResourceObservation,
  Severity,
} from "./audit-lib/types.js";
import {
  loadProgram,
  getResourceClasses,
  type ExtractedResource,
} from "./audit-lib/ast.js";
import { computeFindingId } from "./audit-lib/findings.js";
import { toPosixPath } from "./audit-lib/render.js";

/**
 * Known synonym clusters. If two or more variants from a group appear
 * across the resource set, the audit emits a method_name divergence
 * finding with every variant.
 *
 * Extending this list is part of the audit's review surface — adding a
 * new group widens what the audit considers a "synonym" worth flagging.
 */
const NAME_SYNONYM_GROUPS: ReadonlyArray<ReadonlyArray<string>> = [
  ["add", "create", "draft"],
  ["delete", "remove"],
  ["info", "get"],
];

export const runConsistency: AuditModule<ConsistencyMatrix> = async (ctx) => {
  const program = loadProgram(resolve(ctx.repoRoot, "tsconfig.json"));
  return runConsistencyAgainst(
    program,
    resolve(ctx.repoRoot, "src/resources"),
    ctx,
  );
};

/**
 * Lower-level entry point used by `runConsistency` and by unit tests.
 * Lets tests construct a fixture-only ts.Program instead of loading
 * the real SDK tsconfig.
 */
export async function runConsistencyAgainst(
  program: ts.Program,
  resourcesDirAbs: string,
  ctx: AuditContext,
): Promise<{ findings: Finding[]; artifact: ConsistencyMatrix }> {
  const extracted = getResourceClasses(program, resourcesDirAbs);
  const resources = buildResourceObservations(extracted, ctx.repoRoot);
  const methodIndex = indexMethodsByName(resources);
  const { clusters, findings } = detectDivergences(methodIndex);

  clusters.sort(compareClusters);
  findings.sort((a, b) => a.id.localeCompare(b.id));

  const matrix: ConsistencyMatrix = {
    sha: ctx.sha,
    generated_for_branch: ctx.branch,
    schema_version: "1",
    resources,
    divergence_clusters: clusters,
  };

  return { findings, artifact: matrix };
}

// ---------------------------------------------------------------------------
// Resource observation construction
// ---------------------------------------------------------------------------

function buildResourceObservations(
  extracted: ExtractedResource[],
  repoRoot: string,
): ResourceObservation[] {
  return extracted
    .map((e) => ({
      name: deriveResourceName(e.class_name),
      class_name: e.class_name,
      file: toPosixPath(e.file, repoRoot),
      methods: e.methods
        .map((m): MethodObservation => ({
          name: m.name,
          endpoint: m.endpoint,
          param_shape: normalizeParamShape(m.param_type_text),
          return_envelope: m.return_envelope,
          errors: [],
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** `ContactsResource` → `contacts`; `CustomFieldDefinitionsResource` → `customFieldDefinitions`. */
function deriveResourceName(className: string): string {
  const stripped = className.endsWith("Resource")
    ? className.slice(0, -"Resource".length)
    : className;
  if (stripped.length === 0) return stripped;
  return stripped[0].toLowerCase() + stripped.slice(1);
}

/** Replace endpoint-string literals with `"<endpoint>"` for cross-resource type comparison. */
function normalizeParamShape(typeText: string): string {
  return typeText.replace(/"[^"]*\.[^"]*"/g, '"<endpoint>"');
}

// ---------------------------------------------------------------------------
// Divergence detection
// ---------------------------------------------------------------------------

interface MethodOccurrence {
  resource: string;
  method: MethodObservation;
}

function indexMethodsByName(
  resources: ResourceObservation[],
): Map<string, MethodOccurrence[]> {
  const index = new Map<string, MethodOccurrence[]>();
  for (const r of resources) {
    for (const method of r.methods) {
      let bucket = index.get(method.name);
      if (!bucket) {
        bucket = [];
        index.set(method.name, bucket);
      }
      bucket.push({ resource: r.name, method });
    }
  }
  return index;
}

function detectDivergences(
  methodIndex: Map<string, MethodOccurrence[]>,
): { clusters: DivergenceCluster[]; findings: Finding[] } {
  const clusters: DivergenceCluster[] = [];
  const findings: Finding[] = [];

  // 1. Per-method-name divergence in return_envelope and param_shape.
  for (const [methodName, occurrences] of methodIndex) {
    if (occurrences.length < 2) continue;

    const envelopeVariants = groupVariants(
      occurrences,
      (o) => o.method.return_envelope,
    );
    if (envelopeVariants.length >= 2) {
      const f = makeDivergenceFinding("return_envelope", methodName, envelopeVariants, "medium");
      findings.push(f);
      clusters.push({ attribute: "return_envelope", variants: envelopeVariants, finding_id: f.id });
    }

    const shapeVariants = groupVariants(occurrences, (o) => o.method.param_shape);
    if (shapeVariants.length >= 2) {
      const f = makeDivergenceFinding("param_shape", methodName, shapeVariants, "medium");
      findings.push(f);
      clusters.push({ attribute: "param_shape", variants: shapeVariants, finding_id: f.id });
    }
  }

  // 2. Method-name divergence via synonym groups.
  for (const group of NAME_SYNONYM_GROUPS) {
    const present = group
      .map((name) => ({ name, occurrences: methodIndex.get(name) ?? [] }))
      .filter((g) => g.occurrences.length > 0);
    if (present.length < 2) continue;

    const variants: DivergenceVariant[] = present
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((g) => ({
        value: g.name,
        occurrence_count: g.occurrences.length,
        resources_methods: g.occurrences
          .map((o) => `${o.resource}.${o.method.name}`)
          .sort(),
      }));

    const groupTag = group.join("/");
    const f = makeDivergenceFinding(
      "method_name",
      `synonym-group:${groupTag}`,
      variants,
      "low",
    );
    findings.push(f);
    clusters.push({ attribute: "method_name", variants, finding_id: f.id });
  }

  return { clusters, findings };
}

function groupVariants(
  occurrences: MethodOccurrence[],
  keyFn: (o: MethodOccurrence) => string,
): DivergenceVariant[] {
  const groups = new Map<string, MethodOccurrence[]>();
  for (const o of occurrences) {
    const key = keyFn(o);
    let bucket = groups.get(key);
    if (!bucket) {
      bucket = [];
      groups.set(key, bucket);
    }
    bucket.push(o);
  }
  if (groups.size < 2) return [];
  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([value, occs]) => ({
      value,
      occurrence_count: occs.length,
      resources_methods: occs
        .map((o) => `${o.resource}.${o.method.name}`)
        .sort(),
    }));
}

function makeDivergenceFinding(
  attribute: "method_name" | "param_shape" | "return_envelope",
  scope: string,
  variants: DivergenceVariant[],
  severity: Severity,
): Finding {
  const variantSummary = variants
    .map((v) => `${v.value} (${v.occurrence_count})`)
    .join(" vs ");
  const message = `${attribute} divergence on ${scope}: ${variantSummary}`;
  const location = { file: "src/resources/", start_line: 0, end_line: 0 };
  const variantsOnFinding: DivergenceVariantOnFinding[] = variants.map((v) => ({
    name: v.value,
    occurrence_count: v.occurrence_count,
    resources: v.resources_methods,
  }));
  return {
    id: computeFindingId({ category: "consistency", principle: null, location, message }),
    category: "consistency",
    principle: null,
    location,
    severity,
    classification: "non-trivial",
    message,
    details: null,
    remediation: {
      kind: "task",
      proposed_approach:
        `Reviewer to pick canonical form (audit does not auto-arbitrate, per Q3). ` +
        `Variants: ${variants.map((v) => `${v.value}=[${v.resources_methods.join(", ")}]`).join("; ")}.`,
      version_impact: "major",
    },
    variants: variantsOnFinding,
  };
}

// ---------------------------------------------------------------------------
// Stable ordering for FR-009 reproducibility
// ---------------------------------------------------------------------------

function compareClusters(a: DivergenceCluster, b: DivergenceCluster): number {
  if (a.attribute !== b.attribute) return a.attribute.localeCompare(b.attribute);
  return a.variants[0].value.localeCompare(b.variants[0].value);
}

// ---------------------------------------------------------------------------
// Markdown rendering
// ---------------------------------------------------------------------------

import { mdTable } from "./audit-lib/render.js";

/**
 * Render the ConsistencyMatrix as commit-ready markdown.
 *
 * Layout: header → per-resource method-name summary → per-cluster
 * divergence breakdowns. Optimized for PR review (wide tables collapse
 * poorly on GitHub; tall-narrow renders better).
 */
export function renderConsistencyMatrixMd(matrix: ConsistencyMatrix): string {
  const lines: string[] = [
    `# Consistency Matrix`,
    ``,
    `**Branch**: \`${matrix.generated_for_branch}\` · **SHA**: \`${matrix.sha}\``,
    ``,
    `Resources audited: **${matrix.resources.length}** · Methods total: **${countMethods(matrix)}** · Divergence clusters: **${matrix.divergence_clusters.length}**`,
    ``,
    `## Resource × method overview`,
    ``,
    mdTable(
      ["Resource", "Class", "Methods"],
      matrix.resources.map((r) => [
        r.name,
        r.class_name,
        r.methods.map((m) => m.name).join(", "),
      ]),
    ),
    ``,
  ];

  if (matrix.divergence_clusters.length === 0) {
    lines.push(`## Divergence clusters`, ``);
    lines.push(`*No divergences detected. Every shared method name has a uniform parameter shape and return envelope across resources.*`);
    lines.push(``);
    return lines.join("\n");
  }

  lines.push(`## Divergence clusters`, ``);
  lines.push(
    `> Each cluster surfaces a deviation across resources. The audit refuses to ` +
      `pick a canonical form (per Q3 clarification) — the reviewer decides during ` +
      `PR review. Every rename is a MAJOR-version proposal (constitution principle II).`,
  );
  lines.push(``);

  for (const cluster of matrix.divergence_clusters) {
    lines.push(
      `### ${clusterTitle(cluster)} (finding \`${cluster.finding_id}\`)`,
      ``,
    );
    lines.push(
      mdTable(
        ["Variant", "Count", "Resources × methods"],
        cluster.variants.map((v) => [
          v.value,
          String(v.occurrence_count),
          v.resources_methods.join(", "),
        ]),
      ),
    );
    lines.push(``);
  }

  return lines.join("\n");
}

function clusterTitle(cluster: DivergenceCluster): string {
  const variantValues = cluster.variants.map((v) => v.value).join(" vs ");
  return `${cluster.attribute}: ${variantValues}`;
}

function countMethods(matrix: ConsistencyMatrix): number {
  return matrix.resources.reduce((acc, r) => acc + r.methods.length, 0);
}

// Silence ts unused-import diagnostics for type-only callers.
void ts;
