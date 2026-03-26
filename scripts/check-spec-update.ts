import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const SPEC_URL =
  "https://unpkg.com/@teamleader/focus-api-specification/dist/api.focus.teamleader.eu.dereferenced.yaml";
const SPEC_PATH = resolve(ROOT, "api-spec.yaml");
const CHANGELOG_PATH = resolve(ROOT, "CHANGELOG.md");

const IGNORED_OPERATIONS = new Set([
  "dealPhases.duplicate", // Patch 2: returns 404, not functional
]);

const OPERATION_PREFIX_OVERRIDES: Record<string, string> = {
  NextgenProjects: "projects",
  NextgenProjectsMaterials: "projectMaterials",
  NextgenProjectsTasks: "projectTasks",
  NextgenProjectsExternalParties: "externalParties",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseVersion(yaml: string): string {
  const match = yaml.match(/^\s+version:\s*(.+)$/m);
  return match ? match[1].trim() : "unknown";
}

function parseEndpoints(yaml: string): Set<string> {
  const matches = yaml.match(/^  \/\S+:/gm);
  if (!matches) return new Set();
  return new Set(matches.map((m) => m.replace(/:$/, "").trim()));
}

function difference<T>(a: Set<T>, b: Set<T>): T[] {
  return [...a].filter((x) => !b.has(x));
}

function kebabToCamelCase(s: string): string {
  return s.replace(/-([a-zA-Z0-9])/g, (_, c: string) => c.toUpperCase());
}

function resolveResourceName(prefix: string): string {
  if (OPERATION_PREFIX_OVERRIDES[prefix]) {
    return OPERATION_PREFIX_OVERRIDES[prefix];
  }
  return prefix[0].toLowerCase() + prefix.slice(1);
}

// ---------------------------------------------------------------------------
// Changelog
// ---------------------------------------------------------------------------

function buildChangelogEntry(
  remoteVersion: string,
  added: string[],
  removed: string[]
): string {
  const date = new Date().toISOString().slice(0, 10);
  const lines: string[] = [];

  lines.push(`## [Unreleased] - ${date}`);
  lines.push("");
  lines.push(`API spec updated: → ${remoteVersion}`);

  if (added.length) {
    lines.push("");
    lines.push("### Added");
    for (const ep of added.sort()) {
      lines.push(`- \`${ep}\` endpoint`);
    }
  }

  if (removed.length) {
    lines.push("");
    lines.push("### Removed");
    for (const ep of removed.sort()) {
      lines.push(`- \`${ep}\` endpoint`);
    }
  }

  return lines.join("\n");
}

function prependChangelogEntry(entry: string): void {
  const changelog = readFileSync(CHANGELOG_PATH, "utf-8");
  // Insert after the header block (first ## marks start of entries)
  const firstEntryIndex = changelog.indexOf("\n## ");
  if (firstEntryIndex === -1) {
    // No existing entries, append to end
    writeFileSync(CHANGELOG_PATH, changelog.trimEnd() + "\n\n" + entry + "\n");
  } else {
    const header = changelog.slice(0, firstEntryIndex);
    const rest = changelog.slice(firstEntryIndex + 1); // skip the \n
    writeFileSync(CHANGELOG_PATH, header + "\n" + entry + "\n\n" + rest);
  }
}

// ---------------------------------------------------------------------------
// SDK Coverage Report
// ---------------------------------------------------------------------------

interface SpecEndpoint {
  path: string;
  operationId: string;
  resource: string;
  method: string;
  hasBody: boolean;
  bodyRequired: boolean;
  returnsVoid: boolean;
}

function parseSpecEndpoints(yaml: string): SpecEndpoint[] {
  const endpoints: SpecEndpoint[] = [];

  // Find all path positions
  const pathRegex = /^  (\/\S+):$/gm;
  const positions: { path: string; start: number }[] = [];
  let match;
  while ((match = pathRegex.exec(yaml))) {
    positions.push({ path: match[1], start: match.index });
  }

  for (let i = 0; i < positions.length; i++) {
    const { path, start } = positions[i];
    const end = i + 1 < positions.length ? positions[i + 1].start : yaml.length;
    const block = yaml.slice(start, end);

    const opIdMatch = block.match(/operationId:\s*(.+)/);
    if (!opIdMatch) continue;
    const operationId = opIdMatch[1].trim();

    // Check for requestBody and its required flag
    const reqBodyIdx = block.indexOf("\n      requestBody:");
    const responsesIdx = block.indexOf("\n      responses:");
    const hasBody = reqBodyIdx !== -1;
    let bodyRequired = false;
    if (hasBody && responsesIdx !== -1) {
      const reqBodyBlock = block.slice(reqBodyIdx, responsesIdx);
      bodyRequired = /^\s{8}required:\s*true/m.test(reqBodyBlock);
    }

    // Check for 204 response
    const returnsVoid =
      responsesIdx !== -1 && /^\s{8}'204':/m.test(block.slice(responsesIdx));

    // Derive resource and method from operationId
    const dotIndex = operationId.lastIndexOf(".");
    const prefix = operationId.slice(0, dotIndex);
    const method = kebabToCamelCase(operationId.slice(dotIndex + 1));
    const resource = resolveResourceName(prefix);

    endpoints.push({
      path,
      operationId,
      resource,
      method,
      hasBody,
      bodyRequired,
      returnsVoid,
    });
  }

  return endpoints;
}

function scanResourceFiles(): Map<
  string,
  { file: string; methods: Set<string> }
> {
  const resourceDir = resolve(ROOT, "src/resources");
  const files = readdirSync(resourceDir).filter(
    (f) => f.endsWith(".ts") && f !== "base.ts"
  );
  const resources = new Map<string, { file: string; methods: Set<string> }>();

  for (const file of files) {
    const resourceName = kebabToCamelCase(file.replace(".ts", ""));
    const content = readFileSync(resolve(resourceDir, file), "utf-8");
    const methods = new Set<string>();

    const methodRegex = /^  (\w+)\(/gm;
    let m;
    while ((m = methodRegex.exec(content))) {
      methods.add(m[1]);
    }

    resources.set(resourceName, { file: `src/resources/${file}`, methods });
  }

  return resources;
}

function reportSdkCoverage(specYaml: string): void {
  const specEndpoints = parseSpecEndpoints(specYaml);
  const sdkResources = scanResourceFiles();

  // Group spec endpoints by resource
  const specByResource = new Map<string, SpecEndpoint[]>();
  for (const ep of specEndpoints) {
    if (!specByResource.has(ep.resource)) {
      specByResource.set(ep.resource, []);
    }
    specByResource.get(ep.resource)!.push(ep);
  }

  // Find missing methods (in spec but not in SDK)
  const missing = new Map<string, { file: string; methods: SpecEndpoint[] }>();

  for (const [resource, endpoints] of specByResource) {
    const sdk = sdkResources.get(resource);
    const sdkMethods = sdk ? sdk.methods : new Set<string>();
    const missingMethods = endpoints.filter((ep) => !sdkMethods.has(ep.method));

    if (missingMethods.length > 0) {
      missing.set(resource, {
        file: sdk ? sdk.file : "(no resource file)",
        methods: missingMethods,
      });
    }
  }

  // Find extra methods (in SDK but not in spec)
  const specMethods = new Map<string, Set<string>>();
  for (const [resource, endpoints] of specByResource) {
    specMethods.set(
      resource,
      new Set(endpoints.map((ep) => ep.method))
    );
  }

  const extra: { resource: string; method: string }[] = [];
  for (const [resource, { methods }] of sdkResources) {
    const specSet = specMethods.get(resource) || new Set();
    for (const method of methods) {
      if (!specSet.has(method)) {
        extra.push({ resource, method });
      }
    }
  }

  // Print report
  console.log("\n--- SDK Coverage ---\n");

  if (missing.size === 0) {
    console.log("All spec endpoints are implemented in the SDK.");
  } else {
    let total = 0;
    for (const [, { methods }] of missing) total += methods.length;

    console.log(`Missing methods (${total}):\n`);

    for (const [resource, { file, methods }] of [...missing].sort((a, b) =>
      a[0].localeCompare(b[0])
    )) {
      console.log(`  ${resource} (${file}):`);
      for (const ep of methods.sort((a, b) =>
        a.method.localeCompare(b.method)
      )) {
        let sig: string;
        if (!ep.hasBody) {
          sig = `${ep.method}()`;
        } else if (ep.bodyRequired) {
          sig = `${ep.method}(params: RequestBody<"${ep.operationId}">)`;
        } else {
          sig = `${ep.method}(params?: RequestBody<"${ep.operationId}">)`;
        }
        const ret = ep.returnsVoid
          ? "void"
          : `ResponseBody<"${ep.operationId}">`;
        console.log(`    + ${sig} -> ${ret}`);
      }
      console.log("");
    }
  }

  if (extra.length > 0) {
    console.log(`Extra methods (in SDK but not in spec):\n`);
    for (const { resource, method } of extra.sort((a, b) =>
      `${a.resource}.${a.method}`.localeCompare(`${b.resource}.${b.method}`)
    )) {
      console.log(`  ? ${resource}.${method}`);
    }
    console.log("");
  }
}

// ---------------------------------------------------------------------------
// Patch Status Report
// ---------------------------------------------------------------------------

function reportPatchStatus(specYaml: string): void {
  console.log("--- Patch Status ---\n");

  // Patch 1: NoteSubjectTypesCreate missing "meeting"
  // Check if the notes.create endpoint's subject.type enum now includes "meeting"
  const notesCreateIdx = specYaml.indexOf("operationId: notes.create");
  if (notesCreateIdx !== -1) {
    const nextEndpoint = specYaml.indexOf("\n  /", notesCreateIdx);
    const block = specYaml.slice(
      notesCreateIdx,
      nextEndpoint !== -1 ? nextEndpoint : undefined
    );
    const hasMeeting = block.includes("- meeting");

    console.log('Patch 1 (NoteSubjectTypesCreate missing "meeting"):');
    if (hasMeeting) {
      console.log('  No longer needed — spec now includes "meeting"');
      console.log("  -> Remove patch from scripts/generate-types.ts");
    } else {
      console.log('  Still needed — spec still omits "meeting"');
    }
  } else {
    console.log("Patch 1: Could not find notes.create endpoint in spec");
  }

  // Patch 2: dealPhases.duplicate returns 404
  // The endpoint exists in the spec but is non-functional. If it's removed
  // from the spec we can drop it from IGNORED_OPERATIONS.
  const hasDealPhasesDuplicate = specYaml.includes(
    "operationId: dealPhases.duplicate"
  );
  console.log("\nPatch 2 (dealPhases.duplicate returns 404):");
  if (hasDealPhasesDuplicate) {
    console.log("  Still needed — endpoint still in spec (but returns 404)");
  } else {
    console.log("  No longer needed — endpoint removed from spec");
    console.log("  -> Remove from IGNORED_OPERATIONS in scripts/check-spec-update.ts");
  }

  // Patch 7: tasks.list missing deal_id filter
  const tasksListIdx = specYaml.indexOf("operationId: tasks.list");
  if (tasksListIdx !== -1) {
    const nextEp = specYaml.indexOf("\n  /", tasksListIdx);
    const tasksBlock = specYaml.slice(tasksListIdx, nextEp !== -1 ? nextEp : undefined);
    const hasDealId = tasksBlock.includes("deal_id");

    console.log("\nPatch 7 (tasks.list missing deal_id filter):");
    if (hasDealId) {
      console.log("  No longer needed — spec now includes deal_id");
      console.log("  -> Remove patch from scripts/generate-types.ts");
    } else {
      console.log("  Still needed — spec still omits deal_id filter");
    }
  } else {
    console.log("\nPatch 7: Could not find tasks.list endpoint in spec");
  }

  console.log("");
}

// ---------------------------------------------------------------------------
// Add Missing Methods
// ---------------------------------------------------------------------------

function generateMethodCode(ep: SpecEndpoint): string {
  const returnType = ep.returnsVoid
    ? "void"
    : `ResponseBody<"${ep.operationId}">`;

  if (!ep.hasBody) {
    return [
      `  ${ep.method}() {`,
      `    return this.client.request<${returnType}>("${ep.path}");`,
      `  }`,
    ].join("\n");
  }

  const optional = ep.bodyRequired ? "" : "?";
  return [
    `  ${ep.method}(params${optional}: RequestBody<"${ep.operationId}">) {`,
    `    return this.client.request<${returnType}>("${ep.path}", params);`,
    `  }`,
  ].join("\n");
}

function addMissingMethods(specYaml: string): void {
  const specEndpoints = parseSpecEndpoints(specYaml);
  const sdkResources = scanResourceFiles();

  // Group spec endpoints by resource
  const specByResource = new Map<string, SpecEndpoint[]>();
  for (const ep of specEndpoints) {
    if (!specByResource.has(ep.resource)) {
      specByResource.set(ep.resource, []);
    }
    specByResource.get(ep.resource)!.push(ep);
  }

  // Find missing methods per resource file
  const toAdd = new Map<string, { filePath: string; methods: SpecEndpoint[] }>();

  for (const [resource, endpoints] of specByResource) {
    const sdk = sdkResources.get(resource);
    if (!sdk) continue; // No resource file — skip (would need a whole new file)

    const missingMethods = endpoints.filter(
      (ep) => !sdk.methods.has(ep.method) && !IGNORED_OPERATIONS.has(ep.operationId)
    );

    if (missingMethods.length > 0) {
      toAdd.set(resource, {
        filePath: resolve(ROOT, sdk.file),
        methods: missingMethods,
      });
    }
  }

  if (toAdd.size === 0) {
    console.log("\nNo missing methods to add.");
    return;
  }

  let totalAdded = 0;

  for (const [resource, { filePath, methods }] of [...toAdd].sort((a, b) =>
    a[0].localeCompare(b[0])
  )) {
    const content = readFileSync(filePath, "utf-8");

    // Find the last closing brace (end of class)
    const lastBraceIndex = content.lastIndexOf("}");
    if (lastBraceIndex === -1) {
      console.error(`  Could not find closing brace in ${filePath}`);
      continue;
    }

    // Generate code for all missing methods
    const generatedMethods = methods
      .sort((a, b) => a.method.localeCompare(b.method))
      .map(generateMethodCode);

    // Insert before the last closing brace
    const before = content.slice(0, lastBraceIndex).trimEnd();
    const after = content.slice(lastBraceIndex);
    const newContent = before + "\n\n" + generatedMethods.join("\n\n") + "\n" + after;

    writeFileSync(filePath, newContent);
    totalAdded += methods.length;

    console.log(`  ${resource}: +${methods.length} method(s)`);
    for (const ep of methods.sort((a, b) => a.method.localeCompare(b.method))) {
      console.log(`    + ${ep.method}`);
    }
  }

  console.log(`\nAdded ${totalAdded} method(s) to ${toAdd.size} resource file(s).`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("Fetching remote spec...");
  const response = await fetch(SPEC_URL);
  if (!response.ok) {
    console.error(
      `Failed to fetch remote spec: ${response.status} ${response.statusText}`
    );
    process.exit(1);
  }
  const remoteText = await response.text();
  const localText = readFileSync(SPEC_PATH, "utf-8");

  const remoteVersion = parseVersion(remoteText);
  const localVersion = parseVersion(localText);
  const remoteEndpoints = parseEndpoints(remoteText);
  const localEndpoints = parseEndpoints(localText);

  const added = difference(remoteEndpoints, localEndpoints);
  const removed = difference(localEndpoints, remoteEndpoints);
  const hasChanges =
    remoteVersion !== localVersion || added.length > 0 || removed.length > 0;

  if (!hasChanges) {
    console.log(`Already up to date (v${localVersion}).`);
  } else {
    console.log(`Spec version: ${localVersion} -> ${remoteVersion}`);
    if (added.length) {
      console.log(`\nAdded endpoints (${added.length}):`);
      for (const ep of added.sort()) console.log(`  + ${ep}`);
    }
    if (removed.length) {
      console.log(`\nRemoved endpoints (${removed.length}):`);
      for (const ep of removed.sort()) console.log(`  - ${ep}`);
    }

    if (process.argv.includes("--update")) {
      console.log("\nUpdating api-spec.yaml...");
      writeFileSync(SPEC_PATH, remoteText);

      const specsDir = resolve(ROOT, "api-specs");
      mkdirSync(specsDir, { recursive: true });
      const versionedPath = resolve(specsDir, `${remoteVersion}.yaml`);
      writeFileSync(versionedPath, remoteText);
      console.log(`Saved versioned copy to api-specs/${remoteVersion}.yaml`);

      console.log("Updating CHANGELOG.md...");
      const entry = buildChangelogEntry(remoteVersion, added, removed);
      prependChangelogEntry(entry);

      console.log(
        '\nSpec and changelog updated. Run "npm run generate" to regenerate types.'
      );
    } else {
      console.log("\nRun with --update to apply changes.");
    }
  }

  // Always report SDK coverage and patch status
  reportSdkCoverage(remoteText);
  reportPatchStatus(remoteText);

  if (process.argv.includes("--add-methods")) {
    console.log("--- Adding Missing Methods ---\n");
    addMissingMethods(remoteText);
  }
}

main();
