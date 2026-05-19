/**
 * Shared types for the SDK audit. Each interface mirrors a JSON Schema
 * under specs/001-sdk-quality-audit/contracts/ — keep them in sync.
 *
 * Field names preserve the schemas' snake_case so the in-memory shape
 * round-trips through stableStringify() without remapping.
 */

export type Principle = "I" | "II" | "III" | "IV" | "V" | "VI";

export type Verdict = "yes" | "partial" | "no" | "n/a";

export type Severity = "low" | "medium" | "high";

export type Classification = "trivial" | "non-trivial";

export type FindingCategory =
  | "consistency"
  | "principle-compliance"
  | "documentation"
  | "changelog";

export type VersionImpact = "none" | "patch" | "minor" | "major";

export type ReturnEnvelope =
  | "single"
  | "iterable"
  | "void"
  | "binary"
  | "other";

export type DivergenceAttribute =
  | "method_name"
  | "param_shape"
  | "return_envelope";

export interface Location {
  file: string;
  start_line: number;
  end_line: number;
}

export interface DivergenceVariantOnFinding {
  name: string;
  occurrence_count: number;
  /** Pairs formatted as "resource_name.method_name". */
  resources: string[];
}

export type Remediation =
  | { kind: "in-pr"; description: string }
  | {
      kind: "task";
      proposed_approach: string;
      version_impact: VersionImpact;
    };

export interface Finding {
  id: string;
  category: FindingCategory;
  principle: Principle | null;
  location: Location;
  severity: Severity;
  classification: Classification;
  message: string;
  details: string | null;
  remediation: Remediation;
  variants: DivergenceVariantOnFinding[] | null;
}

export interface FindingsFile {
  sha: string;
  generated_for_branch: string;
  schema_version: "1";
  findings: Finding[];
}

// ---------------------------------------------------------------------------
// Compliance Report
// ---------------------------------------------------------------------------

export type ComplianceCells = Record<Principle, Verdict>;

export interface ComplianceRow {
  file: string;
  cells: ComplianceCells;
  finding_ids: string[];
}

export interface ComplianceReport {
  sha: string;
  generated_for_branch: string;
  schema_version: "1";
  rows: ComplianceRow[];
}

// ---------------------------------------------------------------------------
// Consistency Matrix
// ---------------------------------------------------------------------------

export interface MethodObservation {
  name: string;
  endpoint: string;
  param_shape: string;
  return_envelope: ReturnEnvelope;
  errors: string[];
}

export interface ResourceObservation {
  name: string;
  class_name: string;
  file: string;
  methods: MethodObservation[];
}

export interface DivergenceVariant {
  value: string;
  occurrence_count: number;
  /** Pairs formatted as "resource_name.method_name". */
  resources_methods: string[];
}

export interface DivergenceCluster {
  attribute: DivergenceAttribute;
  variants: DivergenceVariant[];
  finding_id: string;
}

export interface ConsistencyMatrix {
  sha: string;
  generated_for_branch: string;
  schema_version: "1";
  resources: ResourceObservation[];
  divergence_clusters: DivergenceCluster[];
}

// ---------------------------------------------------------------------------
// Module contract — every audit module implements this
// ---------------------------------------------------------------------------

export type AuditModuleName =
  | "consistency"
  | "compliance"
  | "docs"
  | "changelog";

export interface AuditModuleResult<TArtifact = unknown> {
  findings: Finding[];
  /** Module's primary artifact, if any. `null` for modules that only contribute findings. */
  artifact: TArtifact | null;
}

export interface AuditContext {
  /** Full git SHA the audit is running against. */
  sha: string;
  /** Branch name at audit time. */
  branch: string;
  /** Absolute path to repository root. */
  repoRoot: string;
}

export type AuditModule<TArtifact = unknown> = (
  ctx: AuditContext,
) => Promise<AuditModuleResult<TArtifact>>;
