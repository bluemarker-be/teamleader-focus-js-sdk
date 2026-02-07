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

`;

  const { writeFileSync } = await import("node:fs");
  const { resolve, dirname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const outPath = resolve(__dirname, "../src/types/generated.ts");

  writeFileSync(outPath, header + output, "utf-8");
  console.log("Types written to:", outPath);
}

main().catch((err) => {
  console.error("Failed to generate types:", err);
  process.exit(1);
});
