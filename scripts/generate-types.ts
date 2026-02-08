import openapiTS, { astToString } from "openapi-typescript";

const SPEC_URL =
  "https://unpkg.com/@teamleader/focus-api-specification/dist/api.focus.teamleader.eu.dereferenced.yaml";

async function main() {
  console.log("Fetching OpenAPI spec from:", SPEC_URL);

  const ast = await openapiTS(new URL(SPEC_URL));
  const output = astToString(ast);

  const header = `// Auto-generated from Teamleader Focus API OpenAPI spec
// Do not edit manually — run \`npm run generate\` to regenerate
// Source: ${SPEC_URL}
// Generated: ${new Date().toISOString()}
//
// ⚠️  Post-generation patches (spec deviations reported to Teamleader):
//
// 1. NoteSubjectTypesCreate missing "meeting"
//    The API accepts "meeting" as subject.type in notes.create, but the
//    OpenAPI spec omits it from the NoteSubjectTypesCreate enum.
//    Patch: added "meeting" to all NoteSubjectTypesCreate occurrences.
//
// 2. dealPhases.duplicate returns 404
//    The endpoint exists in the spec but is not functional in the API.
//    No patch needed — the SDK includes the method, tests skip it.
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

  // Patch 1: Add "meeting" to NoteSubjectTypesCreate enum
  // The API accepts "meeting" as notes.create subject.type but the spec omits it.
  const noteSubjectWithoutMeeting =
    '"company" | "contact" | "creditNote" | "deal" | "invoice" | "nextgenProject" | "product" | "quotation" | "subscription"';
  const noteSubjectWithMeeting =
    '"company" | "contact" | "creditNote" | "deal" | "invoice" | "meeting" | "nextgenProject" | "product" | "quotation" | "subscription"';

  const patchCount = patched.split(noteSubjectWithoutMeeting).length - 1;
  if (patchCount > 0) {
    patched = patched.replaceAll(noteSubjectWithoutMeeting, noteSubjectWithMeeting);
    console.log(`Patch 1: Added "meeting" to NoteSubjectTypesCreate (${patchCount} occurrences)`);
  } else {
    console.log("Patch 1: NoteSubjectTypesCreate already includes meeting (or pattern changed)");
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
  const { resolve, dirname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const outPath = resolve(__dirname, "../src/types/generated.ts");

  writeFileSync(outPath, header + patched, "utf-8");
  console.log("Types written to:", outPath);
}

main().catch((err) => {
  console.error("Failed to generate types:", err);
  process.exit(1);
});
