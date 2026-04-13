import type { TeamleaderClient } from "../../src/client.js";
import { readdirSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const hitEndpoints = new Set<string>();

export function trackCoverage(client: TeamleaderClient): void {
  const originalRequest = client.request.bind(client);
  (client as any).request = async function <T>(
    endpoint: string,
    body?: unknown,
  ): Promise<T> {
    hitEndpoints.add(endpoint);
    return originalRequest(endpoint, body);
  };
}

function getLatestSpecPath(): string {
  const specsDir = resolve(__dirname, "../../api-specs");
  const files = readdirSync(specsDir)
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
  return resolve(specsDir, files[files.length - 1]);
}

export function getAllSpecEndpoints(): string[] {
  const yaml = readFileSync(getLatestSpecPath(), "utf-8");
  const matches = yaml.match(/^  \/\S+:/gm);
  if (!matches) return [];
  return matches.map((m) => m.replace(/:$/, "").trim());
}

const SKIPPED_ENDPOINTS: Record<string, string> = {
  "/invoices.sendViaPeppol": "requires Peppol configuration",
  "/creditNotes.sendViaPeppol": "requires Peppol configuration",
  "/migrate.id": "requires legacy system IDs",
  "/migrate.taxRate": "requires legacy tax rate ID",
  "/migrate.activityType": "requires legacy activity type ID",
  "/incomingInvoices.sendToBookkeeping": "requires bookkeeping integration",
  "/incomingCreditNotes.sendToBookkeeping": "requires bookkeeping integration",
  "/receipts.sendToBookkeeping": "requires bookkeeping integration",
};

export interface CoverageReport {
  total: number;
  covered: number;
  skipped: Array<{ endpoint: string; reason: string }>;
  untested: string[];
  percentage: number;
}

export function getCoverageReport(): CoverageReport {
  const allEndpoints = getAllSpecEndpoints();
  const covered = allEndpoints.filter((ep) => hitEndpoints.has(ep));
  const missing = allEndpoints.filter((ep) => !hitEndpoints.has(ep));
  const skipped = missing
    .filter((ep) => SKIPPED_ENDPOINTS[ep])
    .map((ep) => ({ endpoint: ep, reason: SKIPPED_ENDPOINTS[ep] }));
  const untested = missing.filter((ep) => !SKIPPED_ENDPOINTS[ep]);
  return {
    total: allEndpoints.length,
    covered: covered.length,
    skipped,
    untested,
    percentage: Math.round((covered.length / allEndpoints.length) * 100),
  };
}

export function printCoverageReport(): void {
  const report = getCoverageReport();
  console.log("\n--- Integration Test Coverage ---\n");
  console.log(`Endpoints hit: ${report.covered}/${report.total} (${report.percentage}%)\n`);
  if (report.skipped.length > 0) {
    console.log(`Intentionally skipped (${report.skipped.length}):`);
    for (const { endpoint, reason } of report.skipped) {
      console.log(`  ${endpoint} — ${reason}`);
    }
    console.log("");
  }
  if (report.untested.length > 0) {
    console.log(`UNTESTED (${report.untested.length}):`);
    for (const ep of report.untested.sort()) {
      console.log(`  ${ep}`);
    }
    console.log("");
  } else {
    console.log("All non-skipped endpoints are covered.\n");
  }
}
