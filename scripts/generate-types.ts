import openapiTS, { astToString } from "openapi-typescript";
import { readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SPECS_DIR = resolve(ROOT, "api-specs");

function getLatestSpecPath(): string {
  const files = readdirSync(SPECS_DIR)
    .filter((f) => f.endsWith(".yaml"))
    .sort((a, b) => {
      const va = a.replace(".yaml", "").split(".").map(Number);
      const vb = b.replace(".yaml", "").split(".").map(Number);
      for (let i = 0; i < Math.max(va.length, vb.length); i++) {
        const diff = (va[i] ?? 0) - (vb[i] ?? 0);
        if (diff !== 0) return diff;
      }
      return 0;
    });
  if (files.length === 0) {
    throw new Error("No spec files found in api-specs/. Run check-spec --update first.");
  }
  return resolve(SPECS_DIR, files[files.length - 1]);
}

async function main() {
  if (process.argv.includes("--update")) {
    console.log("Checking for spec updates...\n");
    execFileSync("node", ["--loader", "ts-node/esm", resolve(__dirname, "check-spec-update.ts"), "--update"], {
      cwd: ROOT,
      stdio: "inherit",
    });
    console.log("");
  }

  const specPath = getLatestSpecPath();
  console.log(`Generating types from ${specPath.split("/").slice(-2).join("/")}...`);

  const ast = await openapiTS(new URL(`file://${specPath}`));
  const output = astToString(ast);

  const header = `// Auto-generated from Teamleader Focus API OpenAPI spec
// Do not edit manually — run \`npm run generate\` to regenerate
// Source: api-specs/ (latest version)
// Generated: ${new Date().toISOString()}
//
// ⚠️  Post-generation patches (spec deviations reported to Teamleader):
//
// 1. [RESOLVED in spec 1.136.0] NoteSubjectTypesCreate missing "meeting"
//    The API accepts "meeting" as subject.type in notes.create, but the
//    OpenAPI spec omits it from the NoteSubjectTypesCreate enum.
//    Patch: added "meeting" to all NoteSubjectTypesCreate occurrences.
//    Status: spec now includes "meeting" natively — no patch needed.
//
// 2. dealPhases.duplicate returns 404
//    The endpoint exists in the spec but is not functional in the API.
//    Method intentionally excluded from SDK. Listed in IGNORED_OPERATIONS.
//
// 5. Context enum: "deal" → "sale" + 6 missing contexts
//    The spec uses "deal" but the API requires "sale". Also missing:
//    meeting, todo, callback, meeting_report, pro_external_cost, werkbonnen.
//    Patch: replaced enum in all 9 occurrences.
//
// 6. custom_fields_update_strategy missing from update request types
//    The API supports "partial" strategy on 11 update endpoints but the
//    spec omits the parameter entirely. Not supported on tickets.update.
//    Patch: added optional property to 11 operation request bodies.
//
// 7. tasks.list missing deal_id filter
//    The API accepts deal_id as a filter on tasks.list but the spec omits it.
//    Patch: added optional deal_id to the tasks.listrequest filter.
//
// 8. bookkeepingSubmissions filter.subject.type snake_case → camelCase
//    The spec uses "incoming_invoice" | "incoming_credit_note" but the API
//    expects "incomingInvoice" | "incomingCreditNote".
//    Patch: replaced enum values in all occurrences.
//
// 🧹 Post-generation cleanups (openapi-typescript artifacts):
//
// 3. Removed "& unknown" intersection artifacts (~500 occurrences)
//    openapi-typescript emits these from allOf schemas — they add no type
//    information and hinder language-server autocomplete (especially Deno LS).
//
// 4. Removed "& Record<string, never>" intersection artifacts (~56 occurrences)
//    Same cause as above — empty record intersections that block property
//    assignment and confuse LS type resolution.

`;

  // ---------------------------------------------------------------------------
  // Post-generation patches for known spec deviations
  // ---------------------------------------------------------------------------
  let patched = output;

  // Patch 5: Fix context enum — "deal" → "sale" and add 6 missing contexts
  // The spec uses "deal" but the API requires "sale". Also missing:
  // meeting, todo, callback, meeting_report, pro_external_cost, werkbonnen.
  const wrongContextEnum =
    '"contact" | "company" | "deal" | "project" | "milestone" | "product" | "invoice" | "subscription" | "ticket"';
  const fixedContextEnum =
    '"contact" | "company" | "sale" | "project" | "milestone" | "product" | "invoice" | "subscription" | "ticket" | "meeting" | "todo" | "callback" | "meeting_report" | "pro_external_cost" | "werkbonnen"';

  const contextPatchCount = patched.split(wrongContextEnum).length - 1;
  if (contextPatchCount > 0) {
    patched = patched.replaceAll(wrongContextEnum, fixedContextEnum);
    console.log(`Patch 5: Fixed context enum — "deal" → "sale" + 6 missing contexts (${contextPatchCount} occurrences)`);
  } else {
    console.log('Patch 5: Context enum already fixed (or pattern changed)');
  }

  // Patch 6: Add custom_fields_update_strategy?: "partial" to update request types
  // The API supports a "partial" strategy on 11 update endpoints but the spec
  // omits the parameter. NOT supported on tickets.update (silently ignored).
  const strategyTargetOps = [
    "contacts.update",
    "companies.update",
    "deals.update",
    "products.update",
    "invoices.update",
    "invoices.updateBooked",
    "subscriptions.update",
    "NextgenProjects.update",
    "meetings.update",
    "tasks.update",
    "calls.update",
  ];
  const strategyInsert =
    '\n                    /** @description Use "partial" to update only the provided custom fields, preserving others. Default behavior replaces all custom fields. */\n                    custom_fields_update_strategy?: "partial";';

  let strategyPatchCount = 0;
  for (const op of strategyTargetOps) {
    const opStart = patched.indexOf(`"${op}": {`);
    if (opStart === -1) {
      console.warn(`Patch 6: Operation "${op}" not found — skipped`);
      continue;
    }

    // Find custom_fields?: within the requestBody of this operation (bounded search)
    const cfIdx = patched.indexOf("custom_fields?:", opStart);
    if (cfIdx === -1 || cfIdx > opStart + 15000) {
      console.warn(`Patch 6: custom_fields not found in "${op}" — skipped`);
      continue;
    }

    // Find the closing }[]; of the custom_fields array
    const closingPattern = "}[];";
    const closingIdx = patched.indexOf(closingPattern, cfIdx);
    if (closingIdx === -1 || closingIdx > cfIdx + 2000) {
      console.warn(`Patch 6: Closing "}[];" not found after custom_fields in "${op}" — skipped`);
      continue;
    }

    const insertPos = closingIdx + closingPattern.length;
    patched = patched.slice(0, insertPos) + strategyInsert + patched.slice(insertPos);
    strategyPatchCount++;
  }

  if (strategyPatchCount > 0) {
    console.log(`Patch 6: Added custom_fields_update_strategy to ${strategyPatchCount} update operations`);
  } else {
    console.log('Patch 6: No operations patched (pattern may have changed)');
  }

  // Patch 7: Add deal_id filter to tasks.list request
  // The API accepts deal_id as a filter but the spec omits it.
  const tasksListFilterMarker = '"tasks.listrequest": {\n            filter?: {\n                ids?: string[];';
  if (patched.includes(tasksListFilterMarker)) {
    patched = patched.replace(
      tasksListFilterMarker,
      '"tasks.listrequest": {\n            filter?: {\n                ids?: string[];\n                /** @description Filter tasks linked to a specific deal. */\n                deal_id?: string;',
    );
    console.log("Patch 7: Added deal_id filter to tasks.listrequest");
  } else {
    console.log("Patch 7: tasks.listrequest filter pattern not found (or already patched)");
  }

  // Patch 8: bookkeepingSubmissions filter.subject.type uses snake_case in spec but API expects camelCase
  // Spec: "incoming_invoice" | "incoming_credit_note" | "receipt"
  // API:  "incomingInvoice" | "incomingCreditNote" | "receipt"
  const wrongBookkeepingEnum = '"incoming_invoice" | "incoming_credit_note" | "receipt"';
  const fixedBookkeepingEnum = '"incomingInvoice" | "incomingCreditNote" | "receipt"';
  const bookkeepingPatchCount = patched.split(wrongBookkeepingEnum).length - 1;
  if (bookkeepingPatchCount > 0) {
    patched = patched.replaceAll(wrongBookkeepingEnum, fixedBookkeepingEnum);
    console.log(`Patch 8: Fixed bookkeepingSubmissions subject.type enum — snake_case → camelCase (${bookkeepingPatchCount} occurrences)`);
  } else {
    console.log("Patch 8: bookkeepingSubmissions enum already fixed (or pattern changed)");
  }

  // ---------------------------------------------------------------------------
  // Cleanup: strip openapi-typescript artifacts that hinder LS autocomplete
  // ---------------------------------------------------------------------------

  // Cleanup 1: Remove " & unknown" — adds no type information
  // Matches both ") & unknown" (after enum unions) and "} & unknown" (after objects)
  const unknownBefore = (patched.match(/ & unknown/g) || []).length;
  patched = patched.replaceAll(" & unknown", "");
  if (unknownBefore > 0) {
    console.log(`Cleanup 1: Removed "& unknown" (${unknownBefore} occurrences)`);
  }

  // Cleanup 2: Remove " & Record<string, never>" — empty record intersection
  // that blocks property assignment and confuses LS type resolution
  const recordNeverBefore = (patched.match(/ & Record<string, never>/g) || []).length;
  patched = patched.replaceAll(" & Record<string, never>", "");
  if (recordNeverBefore > 0) {
    console.log(`Cleanup 2: Removed "& Record<string, never>" (${recordNeverBefore} occurrences)`);
  }

  const { writeFileSync } = await import("node:fs");
  const outPath = resolve(ROOT, "src/types/generated.ts");

  writeFileSync(outPath, header + patched, "utf-8");
  console.log("Types written to:", outPath);
}

main().catch((err) => {
  console.error("Failed to generate types:", err);
  process.exit(1);
});
