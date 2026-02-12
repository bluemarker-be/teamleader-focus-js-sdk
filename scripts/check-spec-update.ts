import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const SPEC_URL =
  "https://unpkg.com/@teamleader/focus-api-specification/dist/api.focus.teamleader.eu.dereferenced.yaml";
const SPEC_PATH = resolve(ROOT, "api-spec.yaml");
const CHANGELOG_PATH = resolve(ROOT, "CHANGELOG.md");

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

async function main() {
  console.log("Fetching remote spec...");
  const response = await fetch(SPEC_URL);
  if (!response.ok) {
    console.error(`Failed to fetch remote spec: ${response.status} ${response.statusText}`);
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
    return;
  }

  console.log(`Spec version: ${localVersion} → ${remoteVersion}`);
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

    console.log("Updating CHANGELOG.md...");
    const entry = buildChangelogEntry(remoteVersion, added, removed);
    prependChangelogEntry(entry);

    console.log("\nDone! Run \"npm run generate\" to regenerate types.");
  } else {
    console.log("\nRun with --update to apply changes.");
  }
}

main();
