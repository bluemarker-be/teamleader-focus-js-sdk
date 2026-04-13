/**
 * Static analysis: which API endpoints have integration tests?
 *
 * 1. Parses all endpoints from the latest API spec
 * 2. Builds a method→endpoint map from resource files
 * 3. Scans integration test files for SDK method calls
 * 4. Reports which endpoints are covered and which are missing
 *
 * Usage: npm run test:coverage
 */
import { readdirSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SPECS_DIR = resolve(ROOT, "api-specs");
const RESOURCES_DIR = resolve(ROOT, "src/resources");
const TESTS_DIR = resolve(ROOT, "tests/integration");

// ---------------------------------------------------------------------------
// Endpoints that cannot be tested (require external systems)
// ---------------------------------------------------------------------------

const SKIPPED_ENDPOINTS: Record<string, string> = {
  "/invoices.sendViaPeppol": "requires Peppol configuration",
  "/creditNotes.sendViaPeppol": "requires Peppol configuration",
  "/migrate.id": "requires legacy system IDs",
  "/migrate.taxRate": "requires legacy tax rate ID",
  "/migrate.activityType": "requires legacy activity type ID",
  "/incomingInvoices.sendToBookkeeping": "requires bookkeeping integration",
  "/incomingCreditNotes.sendToBookkeeping": "requires bookkeeping integration",
  "/receipts.sendToBookkeeping": "requires bookkeeping integration",
  "/dealPhases.duplicate": "API returns 404 — endpoint not functional",
};

// ---------------------------------------------------------------------------
// Step 1: Parse all endpoints from API spec
// ---------------------------------------------------------------------------

function getLatestSpecPath(): string {
  const files = readdirSync(SPECS_DIR)
    .filter((f: string) => f.endsWith(".yaml"))
    .sort((a: string, b: string) => {
      const va = a.replace(".yaml", "").split(".").map(Number);
      const vb = b.replace(".yaml", "").split(".").map(Number);
      for (let i = 0; i < Math.max(va.length, vb.length); i++) {
        const diff = (va[i] ?? 0) - (vb[i] ?? 0);
        if (diff !== 0) return diff;
      }
      return 0;
    });
  if (files.length === 0) {
    throw new Error("No spec files found in api-specs/");
  }
  return resolve(SPECS_DIR, files[files.length - 1]);
}

function getAllSpecEndpoints(): string[] {
  const yaml = readFileSync(getLatestSpecPath(), "utf-8");
  const matches = yaml.match(/^  \/\S+:/gm);
  if (!matches) return [];
  return matches.map((m: string) => m.replace(/:$/, "").trim());
}

// ---------------------------------------------------------------------------
// Step 2: Build endpoint→method map from resource files
//
// Strategy: for each line containing this.client.request, extract the
// endpoint URL. Then scan backwards to find the method name.
// Also build the reverse: resource.method → endpoint.
// ---------------------------------------------------------------------------

function kebabToCamelCase(s: string): string {
  return s.replace(/-([a-zA-Z0-9])/g, (_: string, c: string) => c.toUpperCase());
}

interface MethodMapping {
  resourceName: string;
  methodName: string;
  endpoint: string;
}

function buildMethodMappings(): MethodMapping[] {
  const mappings: MethodMapping[] = [];

  const files = readdirSync(RESOURCES_DIR).filter(
    (f: string) => f.endsWith(".ts") && f !== "base.ts",
  );

  for (const file of files) {
    const resourceName = kebabToCamelCase(file.replace(".ts", ""));
    const content = readFileSync(resolve(RESOURCES_DIR, file), "utf-8");
    const lines = content.split("\n");

    for (let i = 0; i < lines.length; i++) {
      // Find lines with this.client.request and extract the endpoint URL (starts with /)
      if (!lines[i].includes("this.client.request")) continue;
      const endpointMatch = lines[i].match(/"(\/[^"]+)"/);
      if (!endpointMatch) continue;
      const endpoint = endpointMatch[1];

      // Scan backwards to find the method name
      for (let j = i; j >= 0; j--) {
        const methodMatch = lines[j].match(/^\s+(\w+)\s*\(/);
        if (methodMatch) {
          mappings.push({
            resourceName,
            methodName: methodMatch[1],
            endpoint,
          });
          break;
        }
      }
    }
  }

  return mappings;
}

// ---------------------------------------------------------------------------
// Step 3: Scan test files for SDK method calls
// ---------------------------------------------------------------------------

function getTestedMethods(): Set<string> {
  const tested = new Set<string>();
  const testFiles = readdirSync(TESTS_DIR).filter((f: string) => f.endsWith(".test.ts"));

  for (const file of testFiles) {
    const content = readFileSync(resolve(TESTS_DIR, file), "utf-8");

    // Match: client.resourceName.methodName(
    const callRegex = /client\.(\w+)\.(\w+)\s*\(/g;
    let match;
    while ((match = callRegex.exec(content))) {
      tested.add(`${match[1]}.${match[2]}`);
    }
  }

  return tested;
}

// ---------------------------------------------------------------------------
// Step 4: Cross-reference and report
// ---------------------------------------------------------------------------

function main(): void {
  const allEndpoints = getAllSpecEndpoints();
  const mappings = buildMethodMappings();
  const testedMethods = getTestedMethods();

  // Build a lookup: "resourceName.methodName" → endpoint
  const methodToEndpoint = new Map<string, string>();
  for (const m of mappings) {
    methodToEndpoint.set(`${m.resourceName}.${m.methodName}`, m.endpoint);
  }

  // Find which endpoints are tested
  const testedEndpoints = new Set<string>();
  for (const method of testedMethods) {
    const endpoint = methodToEndpoint.get(method);
    if (endpoint) {
      testedEndpoints.add(endpoint);
    }
  }

  const covered = allEndpoints.filter((ep) => testedEndpoints.has(ep));
  const missing = allEndpoints.filter((ep) => !testedEndpoints.has(ep));
  const skipped = missing.filter((ep) => SKIPPED_ENDPOINTS[ep]);
  const untested = missing.filter((ep) => !SKIPPED_ENDPOINTS[ep]);
  const percentage = Math.round((covered.length / allEndpoints.length) * 100);

  console.log("--- Integration Test Coverage ---\n");
  console.log(`Endpoints covered: ${covered.length}/${allEndpoints.length} (${percentage}%)\n`);

  if (skipped.length > 0) {
    console.log(`Intentionally skipped (${skipped.length}):`);
    for (const ep of skipped.sort()) {
      console.log(`  ${ep} — ${SKIPPED_ENDPOINTS[ep]}`);
    }
    console.log("");
  }

  if (untested.length > 0) {
    console.log(`UNTESTED (${untested.length}):`);
    for (const ep of untested.sort()) {
      console.log(`  ${ep}`);
    }
    console.log("");
  } else {
    console.log("All non-skipped endpoints have integration tests.\n");
  }
}

main();
