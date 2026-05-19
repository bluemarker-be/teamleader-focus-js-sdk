/**
 * Unit tests for scripts/audit-consistency.ts.
 *
 * Tests run against synthetic fixtures under tests/audit/fixtures/consistency/
 * — NOT against the real SDK source tree — so the tests stay deterministic
 * regardless of upstream refactors. The fixtures are designed to trigger
 * one finding per divergence flavour.
 */

import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import ts from "typescript";
import { describe, expect, it } from "vitest";

import {
  runConsistencyAgainst,
  renderConsistencyMatrixMd,
} from "../../scripts/audit-consistency.js";
import { stableStringify } from "../../scripts/audit-lib/render.js";
import type { AuditContext } from "../../scripts/audit-lib/types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = resolve(__dirname, "fixtures/consistency");
const FIXTURE_FILES = [
  resolve(FIXTURES_DIR, "good-resource.ts"),
  resolve(FIXTURES_DIR, "divergent-resource.ts"),
];

function buildFixtureProgram(): ts.Program {
  return ts.createProgram({
    rootNames: FIXTURE_FILES,
    options: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.NodeNext,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
      noEmit: true,
      strict: false,
      skipLibCheck: true,
    },
  });
}

const CTX: AuditContext = {
  sha: "0000000000000000000000000000000000000000",
  branch: "test",
  repoRoot: resolve(__dirname, "../.."),
};

describe("audit-consistency", () => {
  it("introspects both fixture resources with all their methods", async () => {
    const program = buildFixtureProgram();
    const result = await runConsistencyAgainst(program, FIXTURES_DIR, CTX);

    const names = result.artifact.resources.map((r) => r.name);
    expect(names).toContain("good");
    expect(names).toContain("divergent");

    const good = result.artifact.resources.find((r) => r.name === "good")!;
    expect(good.methods.map((m) => m.name).sort()).toEqual(
      ["add", "delete", "info", "list", "update"],
    );

    const divergent = result.artifact.resources.find((r) => r.name === "divergent")!;
    expect(divergent.methods.map((m) => m.name).sort()).toEqual(
      ["create", "info", "list", "remove", "update"],
    );
  });

  it("flags add-vs-create as a method_name divergence cluster", async () => {
    const program = buildFixtureProgram();
    const result = await runConsistencyAgainst(program, FIXTURES_DIR, CTX);

    const synonymClusters = result.artifact.divergence_clusters.filter(
      (c) => c.attribute === "method_name",
    );
    const addCreate = synonymClusters.find((c) =>
      c.variants.some((v) => v.value === "add") &&
      c.variants.some((v) => v.value === "create"),
    );
    expect(addCreate).toBeDefined();

    const addVariant = addCreate!.variants.find((v) => v.value === "add")!;
    expect(addVariant.occurrence_count).toBe(1);
    expect(addVariant.resources_methods).toEqual(["good.add"]);

    const createVariant = addCreate!.variants.find((v) => v.value === "create")!;
    expect(createVariant.occurrence_count).toBe(1);
    expect(createVariant.resources_methods).toEqual(["divergent.create"]);
  });

  it("flags delete-vs-remove as a method_name divergence cluster", async () => {
    const program = buildFixtureProgram();
    const result = await runConsistencyAgainst(program, FIXTURES_DIR, CTX);

    const cluster = result.artifact.divergence_clusters.find(
      (c) =>
        c.attribute === "method_name" &&
        c.variants.some((v) => v.value === "delete") &&
        c.variants.some((v) => v.value === "remove"),
    );
    expect(cluster).toBeDefined();
  });

  it("flags update return_envelope divergence (single vs void)", async () => {
    const program = buildFixtureProgram();
    const result = await runConsistencyAgainst(program, FIXTURES_DIR, CTX);

    const envelopeClusters = result.artifact.divergence_clusters.filter(
      (c) => c.attribute === "return_envelope",
    );
    expect(envelopeClusters.length).toBeGreaterThan(0);

    const updateCluster = envelopeClusters.find((c) =>
      c.variants.some((v) => v.value === "single") &&
      c.variants.some((v) => v.value === "void"),
    );
    expect(updateCluster).toBeDefined();
    const singleVariant = updateCluster!.variants.find((v) => v.value === "single")!;
    expect(singleVariant.resources_methods).toEqual(["divergent.update"]);
    const voidVariant = updateCluster!.variants.find((v) => v.value === "void")!;
    expect(voidVariant.resources_methods).toEqual(["good.update"]);
  });

  it("does NOT flag list or info — both methods match across resources", async () => {
    const program = buildFixtureProgram();
    const result = await runConsistencyAgainst(program, FIXTURES_DIR, CTX);

    // For each non-method_name cluster, verify it isn't about list/info.
    for (const cluster of result.artifact.divergence_clusters) {
      if (cluster.attribute === "method_name") continue;
      for (const variant of cluster.variants) {
        for (const rm of variant.resources_methods) {
          const methodName = rm.split(".")[1];
          expect(methodName).not.toBe("list");
          expect(methodName).not.toBe("info");
        }
      }
    }
  });

  it("produces every finding with a stable content-derived id", async () => {
    const program = buildFixtureProgram();
    const result = await runConsistencyAgainst(program, FIXTURES_DIR, CTX);

    for (const f of result.findings) {
      expect(f.id).toMatch(/^[0-9a-f]{16}$/);
    }
    // Ensure all IDs are unique within the run.
    const ids = new Set(result.findings.map((f) => f.id));
    expect(ids.size).toBe(result.findings.length);
  });

  it("emits byte-identical JSON on two runs against the same fixtures (FR-009)", async () => {
    const program1 = buildFixtureProgram();
    const program2 = buildFixtureProgram();
    const r1 = await runConsistencyAgainst(program1, FIXTURES_DIR, CTX);
    const r2 = await runConsistencyAgainst(program2, FIXTURES_DIR, CTX);

    expect(stableStringify(r1.artifact)).toBe(stableStringify(r2.artifact));
    expect(stableStringify(r1.findings)).toBe(stableStringify(r2.findings));
  });

  it("renders a non-empty markdown matrix with a divergence-clusters section", async () => {
    const program = buildFixtureProgram();
    const result = await runConsistencyAgainst(program, FIXTURES_DIR, CTX);

    const md = renderConsistencyMatrixMd(result.artifact);
    expect(md).toContain("# Consistency Matrix");
    expect(md).toContain("## Resource × method overview");
    expect(md).toContain("## Divergence clusters");
    expect(md).toContain("good");
    expect(md).toContain("divergent");
    // Header row with all column headers
    expect(md).toContain("| Resource");
  });
});
