/**
 * Endpoint-by-endpoint verification of the SDK.
 *
 * Uses the TypeScript compiler API as the source of truth. For each of the
 * 290 endpoints:
 *   1. Confirm the SDK has a resource method
 *   2. Confirm the endpoint URL matches the spec
 *   3. Find every unit-test and integration-test call
 *   4. Check if calls use `as any` (bypassing type check)
 *   5. Report TypeScript diagnostics for each call
 *
 * Usage: npm run verify:endpoints
 *        npm run verify:endpoints -- --only contacts.list
 *        npm run verify:endpoints -- --fail-on-any  (exit 1 if any `as any`)
 */

import ts from "typescript";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SPECS_DIR = resolve(ROOT, "api-specs");
const RESOURCES_DIR = resolve(ROOT, "src/resources");
const TESTS_UNIT = resolve(ROOT, "tests/resources.test.ts");
const TESTS_INTEGRATION_DIR = resolve(ROOT, "tests/integration");

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const ONLY_ENDPOINT = args.find((a) => a.startsWith("--only="))?.slice(7)
  ?? (args.indexOf("--only") >= 0 ? args[args.indexOf("--only") + 1] : undefined);
const FAIL_ON_AS_ANY = args.includes("--fail-on-any");
const VERBOSE = args.includes("--verbose") || args.includes("-v");

const INTENTIONALLY_SKIPPED: Record<string, string> = {
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
// Step 1: Parse spec to get endpoint → operation ID mapping
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
  return resolve(SPECS_DIR, files[files.length - 1]);
}

interface SpecEndpoint {
  path: string;
  operationId: string;
}

function parseSpecEndpoints(): SpecEndpoint[] {
  const yaml = readFileSync(getLatestSpecPath(), "utf-8");
  const lines = yaml.split("\n");
  const endpoints: SpecEndpoint[] = [];

  let currentPath: string | undefined;
  for (const line of lines) {
    const pathMatch = line.match(/^  (\/\S+):$/);
    if (pathMatch) {
      currentPath = pathMatch[1];
      continue;
    }
    const opMatch = line.match(/^\s+operationId:\s*(\S+)\s*$/);
    if (opMatch && currentPath) {
      endpoints.push({ path: currentPath, operationId: opMatch[1] });
      currentPath = undefined;
    }
  }

  return endpoints;
}

// ---------------------------------------------------------------------------
// Step 2: Parse resource files for method → endpoint mapping
// ---------------------------------------------------------------------------

function kebabToCamelCase(s: string): string {
  return s.replace(/-([a-zA-Z0-9])/g, (_: string, c: string) => c.toUpperCase());
}

interface ResourceMethod {
  resourceName: string;
  methodName: string;
  endpoint: string;
  operationId: string;
  file: string;
  line: number;
}

function parseResourceMethods(): ResourceMethod[] {
  const methods: ResourceMethod[] = [];
  const files = readdirSync(RESOURCES_DIR).filter(
    (f: string) => f.endsWith(".ts") && f !== "base.ts",
  );

  for (const file of files) {
    const resourceName = kebabToCamelCase(file.replace(".ts", ""));
    const fullPath = resolve(RESOURCES_DIR, file);
    const content = readFileSync(fullPath, "utf-8");
    const lines = content.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line.includes("this.client.request")) continue;

      // Extract the endpoint URL (starts with /) from the request call
      const endpointMatch = line.match(/"(\/[^"]+)"/);
      if (!endpointMatch) continue;
      const endpoint = endpointMatch[1];

      // Walk back to find the method signature — operation ID is in
      // `params: RequestBody<"OP">` OR `params?: RequestBody<"OP">` OR
      // the method has no params but returns ResponseBody<"OP"> (e.g. users.me)
      let methodName = "";
      let methodLine = 0;
      let operationId = "";

      for (let j = i; j >= 0; j--) {
        const methodMatch = lines[j].match(/^\s+(\w+)\s*\(/);
        if (methodMatch) {
          methodName = methodMatch[1];
          methodLine = j + 1;

          // Search from the method signature line downward until the
          // request call line for RequestBody<"OP"> or ResponseBody<"OP">
          for (let k = j; k <= i; k++) {
            const opMatch = lines[k].match(
              /(?:RequestBody|ResponseBody)<"([^"]+)">/,
            );
            if (opMatch) {
              operationId = opMatch[1];
              break;
            }
          }
          break;
        }
      }

      methods.push({
        resourceName,
        methodName,
        endpoint,
        operationId,
        file: `src/resources/${file}`,
        line: methodLine,
      });
    }
  }

  return methods;
}

// ---------------------------------------------------------------------------
// Step 3: TypeScript program — find all client.X.Y() calls in tests
// ---------------------------------------------------------------------------

interface TestCall {
  file: string;
  line: number;
  resource: string;
  method: string;
  usesAsAny: boolean;
  diagnostics: string[];
  node: ts.CallExpression;
  argument?: ts.Expression;
}

function loadTypeScriptProgram(): {
  program: ts.Program;
  checker: ts.TypeChecker;
} {
  const configPath = resolve(ROOT, "tsconfig.json");
  const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
  const parsed = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    ROOT,
  );

  // Include test files explicitly (tsconfig excludes them by default)
  const testFiles: string[] = [];
  testFiles.push(TESTS_UNIT);
  if (existsSync(TESTS_INTEGRATION_DIR)) {
    for (const f of readdirSync(TESTS_INTEGRATION_DIR)) {
      if (f.endsWith(".test.ts")) {
        testFiles.push(resolve(TESTS_INTEGRATION_DIR, f));
      }
    }
  }

  const program = ts.createProgram({
    rootNames: [...parsed.fileNames, ...testFiles],
    options: parsed.options,
  });

  return { program, checker: program.getTypeChecker() };
}

function isClientCall(expr: ts.Expression): {
  resource: string;
  method: string;
} | null {
  // Match: client.<resource>.<method>
  // Where `client` is an identifier or property access
  if (!ts.isPropertyAccessExpression(expr)) return null;

  const methodName = expr.name.text;
  const resourceExpr = expr.expression;

  if (!ts.isPropertyAccessExpression(resourceExpr)) return null;
  const resourceName = resourceExpr.name.text;
  const clientExpr = resourceExpr.expression;

  // clientExpr should resolve to a TeamleaderClient
  // Simplest check: identifier named "client" or ends with "client"
  if (ts.isIdentifier(clientExpr)) {
    if (clientExpr.text === "client" || clientExpr.text === "c") {
      return { resource: resourceName, method: methodName };
    }
  }
  return null;
}

function hasAsAnyCast(arg: ts.Expression): boolean {
  if (ts.isAsExpression(arg)) {
    if (arg.type.kind === ts.SyntaxKind.AnyKeyword) return true;
  }
  // Also check for explicit `<any>obj` (rare)
  return false;
}

function getLineNumber(node: ts.Node, sourceFile: ts.SourceFile): number {
  const { line } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
  return line + 1;
}

function findTestCalls(program: ts.Program): TestCall[] {
  const calls: TestCall[] = [];
  const checker = program.getTypeChecker();

  for (const sourceFile of program.getSourceFiles()) {
    const fileName = sourceFile.fileName;
    if (!fileName.includes("/tests/")) continue;
    if (!fileName.endsWith(".test.ts")) continue;

    const diagnostics = [
      ...program.getSemanticDiagnostics(sourceFile),
      ...program.getSyntacticDiagnostics(sourceFile),
    ];

    const visit = (node: ts.Node): void => {
      if (ts.isCallExpression(node)) {
        const match = isClientCall(node.expression);
        if (match) {
          const arg = node.arguments[0];
          const usesAsAny = arg ? hasAsAnyCast(arg) : false;

          // Collect diagnostics that fall within this node
          const nodeStart = node.getStart();
          const nodeEnd = node.getEnd();
          const relatedDiags = diagnostics
            .filter((d) => {
              if (d.file !== sourceFile) return false;
              if (d.start === undefined) return false;
              return d.start >= nodeStart && d.start < nodeEnd;
            })
            .map((d) =>
              ts.flattenDiagnosticMessageText(d.messageText, "\n"),
            );

          calls.push({
            file: fileName.replace(ROOT + "/", ""),
            line: getLineNumber(node, sourceFile),
            resource: match.resource,
            method: match.method,
            usesAsAny,
            diagnostics: relatedDiags,
            node,
            argument: arg,
          });
        }
      }
      ts.forEachChild(node, visit);
    };

    visit(sourceFile);
  }

  return calls;
}

// ---------------------------------------------------------------------------
// Step 4: Cross-reference and report
// ---------------------------------------------------------------------------

interface EndpointReport {
  path: string;
  operationId: string;
  sdk: { found: boolean; file?: string; line?: number; endpointMatch?: boolean; operationIdMatch?: boolean };
  unitTests: TestCall[];
  integrationTests: TestCall[];
}

function buildReport(): EndpointReport[] {
  const specEndpoints = parseSpecEndpoints();
  const resourceMethods = parseResourceMethods();
  const { program } = loadTypeScriptProgram();
  const testCalls = findTestCalls(program);

  // Index resource methods by operation ID for O(1) lookup
  const methodsByOpId = new Map<string, ResourceMethod>();
  const methodsByResourceMethod = new Map<string, ResourceMethod>();
  for (const m of resourceMethods) {
    if (m.operationId) methodsByOpId.set(m.operationId, m);
    methodsByResourceMethod.set(`${m.resourceName}.${m.methodName}`, m);
  }

  // Index test calls by resource.method
  const callsByResourceMethod = new Map<string, TestCall[]>();
  for (const c of testCalls) {
    const key = `${c.resource}.${c.method}`;
    if (!callsByResourceMethod.has(key)) callsByResourceMethod.set(key, []);
    callsByResourceMethod.get(key)!.push(c);
  }

  const reports: EndpointReport[] = [];

  for (const ep of specEndpoints) {
    const sdkMethod = methodsByOpId.get(ep.operationId);
    const calls = sdkMethod
      ? callsByResourceMethod.get(`${sdkMethod.resourceName}.${sdkMethod.methodName}`) ?? []
      : [];

    reports.push({
      path: ep.path,
      operationId: ep.operationId,
      sdk: sdkMethod
        ? {
            found: true,
            file: sdkMethod.file,
            line: sdkMethod.line,
            endpointMatch: sdkMethod.endpoint === ep.path,
            operationIdMatch: sdkMethod.operationId === ep.operationId,
          }
        : { found: false },
      unitTests: calls.filter((c) => c.file.includes("tests/resources.test.ts")),
      integrationTests: calls.filter((c) => c.file.includes("tests/integration/")),
    });
  }

  return reports;
}

// ---------------------------------------------------------------------------
// Step 5: Print report
// ---------------------------------------------------------------------------

function printEndpointDetails(r: EndpointReport): void {
  console.log(`\n${r.path} (${r.operationId}):`);

  if (INTENTIONALLY_SKIPPED[r.path]) {
    console.log(`  ⊘ Intentionally skipped: ${INTENTIONALLY_SKIPPED[r.path]}`);
    return;
  }

  // SDK
  if (!r.sdk.found) {
    console.log(`  ✗ SDK: no resource method for operation "${r.operationId}"`);
    return;
  }
  const sdkOk = r.sdk.endpointMatch && r.sdk.operationIdMatch;
  console.log(`  ${sdkOk ? "✓" : "✗"} SDK: ${r.sdk.file}:${r.sdk.line}`);
  if (!r.sdk.endpointMatch) console.log(`    ✗ Endpoint URL mismatch`);
  if (!r.sdk.operationIdMatch) console.log(`    ✗ Operation ID mismatch`);

  // Unit tests
  if (r.unitTests.length === 0) {
    console.log(`  ✗ No unit test`);
  } else {
    for (const t of r.unitTests) {
      const hasErrors = t.diagnostics.length > 0;
      const icon = t.usesAsAny ? "⚠" : hasErrors ? "✗" : "✓";
      console.log(`  ${icon} Unit test: ${t.file}:${t.line}${t.usesAsAny ? " (uses `as any`)" : ""}`);
      for (const d of t.diagnostics) {
        const msg = d.length > 120 ? d.slice(0, 120) + "..." : d;
        console.log(`    → ${msg}`);
      }
    }
  }

  // Integration tests
  if (r.integrationTests.length === 0) {
    console.log(`  ✗ No integration test`);
  } else {
    for (const t of r.integrationTests) {
      const hasErrors = t.diagnostics.length > 0;
      const icon = t.usesAsAny ? "⚠" : hasErrors ? "✗" : "✓";
      console.log(`  ${icon} Integration test: ${t.file}:${t.line}${t.usesAsAny ? " (uses `as any`)" : ""}`);
      for (const d of t.diagnostics) {
        const msg = d.length > 120 ? d.slice(0, 120) + "..." : d;
        console.log(`    → ${msg}`);
      }
    }
  }
}

function printSummary(reports: EndpointReport[]): void {
  const skipped = reports.filter((r) => INTENTIONALLY_SKIPPED[r.path]);
  const active = reports.filter((r) => !INTENTIONALLY_SKIPPED[r.path]);

  let sdkMissing = 0;
  let sdkMismatch = 0;
  let noUnitTest = 0;
  let noIntegrationTest = 0;
  let unitUsesAsAny = 0;
  let unitHasErrors = 0;
  let intUsesAsAny = 0;
  let intHasErrors = 0;
  let fullyOk = 0;

  for (const r of active) {
    if (!r.sdk.found) { sdkMissing++; continue; }
    if (!r.sdk.endpointMatch || !r.sdk.operationIdMatch) sdkMismatch++;
    if (r.unitTests.length === 0) noUnitTest++;
    if (r.integrationTests.length === 0) noIntegrationTest++;

    const unitAsAny = r.unitTests.filter((t) => t.usesAsAny).length;
    const unitErr = r.unitTests.filter((t) => t.diagnostics.length > 0 && !t.usesAsAny).length;
    const intAsAny = r.integrationTests.filter((t) => t.usesAsAny).length;
    const intErr = r.integrationTests.filter((t) => t.diagnostics.length > 0 && !t.usesAsAny).length;

    unitUsesAsAny += unitAsAny;
    unitHasErrors += unitErr;
    intUsesAsAny += intAsAny;
    intHasErrors += intErr;

    if (
      r.sdk.endpointMatch &&
      r.sdk.operationIdMatch &&
      r.unitTests.length > 0 &&
      r.integrationTests.length > 0 &&
      unitAsAny === 0 &&
      unitErr === 0 &&
      intAsAny === 0 &&
      intErr === 0
    ) {
      fullyOk++;
    }
  }

  console.log(`\n\n========== SUMMARY ==========`);
  console.log(`Total endpoints:              ${reports.length}`);
  console.log(`Intentionally skipped:        ${skipped.length}`);
  console.log(`Active endpoints:             ${active.length}`);
  console.log(``);
  console.log(`Fully verified (✓):           ${fullyOk}`);
  console.log(``);
  console.log(`Issues:`);
  console.log(`  SDK method missing:         ${sdkMissing}`);
  console.log(`  SDK mismatch:               ${sdkMismatch}`);
  console.log(`  No unit test:               ${noUnitTest}`);
  console.log(`  No integration test:        ${noIntegrationTest}`);
  console.log(`  Unit tests w/ \`as any\`:     ${unitUsesAsAny}`);
  console.log(`  Unit tests w/ type errors:  ${unitHasErrors}`);
  console.log(`  Integr. w/ \`as any\`:        ${intUsesAsAny}`);
  console.log(`  Integr. w/ type errors:     ${intHasErrors}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  console.log("Building verification report...\n");
  const reports = buildReport();

  const filtered = ONLY_ENDPOINT
    ? reports.filter(
        (r) =>
          r.path === ONLY_ENDPOINT ||
          r.path === "/" + ONLY_ENDPOINT ||
          r.operationId === ONLY_ENDPOINT,
      )
    : reports;

  if (filtered.length === 0) {
    console.error(`No endpoint matched: ${ONLY_ENDPOINT}`);
    process.exit(1);
  }

  if (ONLY_ENDPOINT || VERBOSE) {
    for (const r of filtered) {
      printEndpointDetails(r);
    }
  } else {
    // Only print problematic endpoints
    for (const r of filtered) {
      if (INTENTIONALLY_SKIPPED[r.path]) continue;
      if (!r.sdk.found) { printEndpointDetails(r); continue; }
      if (!r.sdk.endpointMatch || !r.sdk.operationIdMatch) { printEndpointDetails(r); continue; }
      if (r.unitTests.length === 0 || r.integrationTests.length === 0) { printEndpointDetails(r); continue; }
      const hasAsAnyOrErrors =
        r.unitTests.some((t) => t.usesAsAny || t.diagnostics.length > 0) ||
        r.integrationTests.some((t) => t.usesAsAny || t.diagnostics.length > 0);
      if (hasAsAnyOrErrors) printEndpointDetails(r);
    }
  }

  printSummary(reports);

  if (FAIL_ON_AS_ANY) {
    const activeReports = reports.filter((r) => !INTENTIONALLY_SKIPPED[r.path]);
    const hasAnyIssue = activeReports.some((r) => {
      if (!r.sdk.found) return true;
      if (!r.sdk.endpointMatch || !r.sdk.operationIdMatch) return true;
      const unitBad = r.unitTests.some((t) => t.usesAsAny || t.diagnostics.length > 0);
      const intBad = r.integrationTests.some((t) => t.usesAsAny || t.diagnostics.length > 0);
      return unitBad || intBad;
    });
    if (hasAnyIssue) process.exit(1);
  }
}

main();
