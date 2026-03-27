import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const SPEC_URL =
  "https://unpkg.com/@teamleader/focus-api-specification/dist/api.focus.teamleader.eu.dereferenced.yaml";
const SPEC_PATH = resolve(ROOT, "api-spec.yaml");

// ---------------------------------------------------------------------------
// ANSI colors
// ---------------------------------------------------------------------------

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const DIM = "\x1b[2m";
const CYAN = "\x1b[36m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseVersion(yaml: string): string {
  const match = yaml.match(/^\s+version:\s*(.+)$/m);
  return match ? match[1].trim() : "unknown";
}

/** Normalize YAML anchor ref numbers so renumbering doesn't cause false diffs */
function normalizeRefs(text: string): string {
  return text.replace(/[&*]ref_\d+/g, (m) => m[0] + "ref");
}

function extractEndpointBlocks(yaml: string): Map<string, string> {
  const blocks = new Map<string, string>();
  const pathsIdx = yaml.indexOf("\npaths:\n");
  if (pathsIdx === -1) return blocks;
  const componentsIdx = yaml.indexOf("\ncomponents:\n", pathsIdx);
  const pathsSection = yaml.slice(
    pathsIdx,
    componentsIdx !== -1 ? componentsIdx : undefined
  );

  const pathRegex = /^  (\/\S+):$/gm;
  const positions: { path: string; start: number }[] = [];
  let match;
  while ((match = pathRegex.exec(pathsSection))) {
    positions.push({ path: match[1], start: match.index });
  }
  for (let i = 0; i < positions.length; i++) {
    const { path, start } = positions[i];
    const end =
      i + 1 < positions.length ? positions[i + 1].start : pathsSection.length;
    blocks.set(path, pathsSection.slice(start, end));
  }
  return blocks;
}

function extractSchemaBlocks(yaml: string): Map<string, string> {
  const blocks = new Map<string, string>();
  const schemasIdx = yaml.indexOf("\n  schemas:\n");
  if (schemasIdx === -1) return blocks;
  const schemasSection = yaml.slice(schemasIdx);

  const schemaRegex = /^    ([\w.]+):$/gm;
  const positions: { name: string; start: number }[] = [];
  let match;
  while ((match = schemaRegex.exec(schemasSection))) {
    positions.push({ name: match[1], start: match.index });
  }

  for (let i = 0; i < positions.length; i++) {
    const { name, start } = positions[i];
    const end =
      i + 1 < positions.length
        ? positions[i + 1].start
        : schemasSection.length;
    blocks.set(name, schemasSection.slice(start, end).trim());
  }

  return blocks;
}

function extractTags(yaml: string): string[] {
  const tagsIdx = yaml.indexOf("\ntags:\n");
  const pathsIdx = yaml.indexOf("\npaths:\n");
  if (tagsIdx === -1) return [];
  const tagsSection = yaml.slice(
    tagsIdx,
    pathsIdx !== -1 ? pathsIdx : undefined
  );
  const tags: string[] = [];
  const tagRegex = /^  - name: (.+)$/gm;
  let match;
  while ((match = tagRegex.exec(tagsSection))) {
    tags.push(match[1].trim());
  }
  return tags;
}

// ---------------------------------------------------------------------------
// Unified diff with context
// ---------------------------------------------------------------------------

type DiffOp = { type: "keep" | "add" | "remove"; line: string };

function computeDiff(oldText: string, newText: string): DiffOp[] {
  const oldLines = oldText.split("\n").map((l) => l.trimEnd());
  const newLines = newText.split("\n").map((l) => l.trimEnd());
  const m = oldLines.length;
  const n = newLines.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (oldLines[i - 1] === newLines[j - 1])
        dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  const ops: DiffOp[] = [];
  let i = m,
    j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
      ops.push({ type: "keep", line: oldLines[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      ops.push({ type: "add", line: newLines[j - 1] });
      j--;
    } else {
      ops.push({ type: "remove", line: oldLines[i - 1] });
      i--;
    }
  }
  return ops.reverse();
}

/** Structural YAML keys to skip when building a human-readable path */
const YAML_NOISE = new Set([
  "content",
  "application/json",
  "allOf",
  "items",
  "properties",
  "schema",
  "post",
  "required",
  "title",
  "description",
  "example",
  "nullable",
  "default",
  "summary",
  "operationId",
  "parameters",
  "tags",
  "''",
  '""',
  "",
]);

/**
 * Walk backwards through the diff ops from a change to build a YAML
 * structural path like "requestBody > filter > relates_to > type > enum".
 */
function detectYamlPath(ops: DiffOp[], changeIndex: number): string {
  const parts: string[] = [];
  let currentIndent = Infinity;

  // Find the indent level of the change itself
  for (let ci = changeIndex; ci >= 0; ci--) {
    const op = ops[ci];
    if (op.type === "remove") continue;
    if (op.line.trim()) {
      currentIndent = op.line.length - op.line.trimStart().length;
      break;
    }
  }

  for (let i = changeIndex - 1; i >= 0; i--) {
    const op = ops[i];
    // Only use stable context lines for path detection
    if (op.type !== "keep") continue;
    const line = op.line;
    const trimmed = line.trimStart();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const indent = line.length - trimmed.length;
    if (indent < currentIndent) {
      let key = trimmed.replace(/:.*$/, "").replace(/^- /, "");
      // Strip quotes
      key = key.replace(/^['"](.+)['"]$/, "$1");
      if (key && !YAML_NOISE.has(key)) {
        parts.unshift(key);
      }
      currentIndent = indent;
      if (indent <= 4) break; // reached top level of the endpoint block
    }
  }

  return parts.join(" > ");
}

function formatDiffBlock(
  oldText: string,
  newText: string,
  contextLines = 3
): string {
  const ops = computeDiff(
    normalizeRefs(oldText),
    normalizeRefs(newText)
  );

  const changeIndices = ops
    .map((op, i) => (op.type !== "keep" ? i : -1))
    .filter((i) => i !== -1);
  if (changeIndices.length === 0) return "";

  // Group changes into hunks (merge overlapping context)
  type Hunk = { start: number; end: number };
  const hunks: Hunk[] = [];
  let hStart = Math.max(0, changeIndices[0] - contextLines);
  let hEnd = Math.min(ops.length - 1, changeIndices[0] + contextLines);

  for (let ci = 1; ci < changeIndices.length; ci++) {
    const s = changeIndices[ci] - contextLines;
    const e = Math.min(ops.length - 1, changeIndices[ci] + contextLines);
    if (s <= hEnd + 1) {
      hEnd = e;
    } else {
      hunks.push({ start: hStart, end: hEnd });
      hStart = Math.max(0, s);
      hEnd = e;
    }
  }
  hunks.push({ start: hStart, end: hEnd });

  const lines: string[] = [];

  for (let hi = 0; hi < hunks.length; hi++) {
    const hunk = hunks[hi];
    // Detect YAML path for this hunk
    const firstChange = ops.findIndex(
      (op, i) => i >= hunk.start && i <= hunk.end && op.type !== "keep"
    );
    const path = detectYamlPath(ops, firstChange);
    if (path) {
      lines.push(`    ${CYAN}@ ${path}${RESET}`);
    }

    for (let i = hunk.start; i <= hunk.end; i++) {
      const op = ops[i];
      const content = op.line;
      if (!content.trim()) continue;
      const trimmed = content.trim();
      if (op.type === "add") {
        lines.push(`    ${GREEN}+ ${trimmed}${RESET}`);
      } else if (op.type === "remove") {
        lines.push(`    ${RED}- ${trimmed}${RESET}`);
      } else {
        lines.push(`    ${DIM}  ${trimmed}${RESET}`);
      }
    }

    if (hi < hunks.length - 1) {
      lines.push(`    ${DIM}  ...${RESET}`);
    }
  }

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Report sections
// ---------------------------------------------------------------------------

function reportEndpoints(
  localYaml: string,
  remoteYaml: string
): boolean {
  const localBlocks = extractEndpointBlocks(localYaml);
  const remoteBlocks = extractEndpointBlocks(remoteYaml);

  const added = [...remoteBlocks.keys()].filter((k) => !localBlocks.has(k));
  const removed = [...localBlocks.keys()].filter((k) => !remoteBlocks.has(k));
  const modified = [...remoteBlocks.keys()].filter(
    (k) =>
      localBlocks.has(k) &&
      normalizeRefs(localBlocks.get(k)!) !==
        normalizeRefs(remoteBlocks.get(k)!)
  );

  let hasChanges = false;

  if (added.length > 0) {
    hasChanges = true;
    console.log(`${GREEN}New endpoints (${added.length}):${RESET}`);
    for (const ep of added.sort()) console.log(`  ${GREEN}+ ${ep}${RESET}`);
    console.log("");
  }

  if (removed.length > 0) {
    hasChanges = true;
    console.log(`${RED}Removed endpoints (${removed.length}):${RESET}`);
    for (const ep of removed.sort()) console.log(`  ${RED}- ${ep}${RESET}`);
    console.log("");
  }

  if (modified.length > 0) {
    hasChanges = true;
    console.log(`Modified endpoints (${modified.length}):`);
    for (const ep of modified.sort()) {
      console.log(`\n  ${BOLD}~ ${ep}${RESET}`);
      const diff = formatDiffBlock(
        localBlocks.get(ep)!,
        remoteBlocks.get(ep)!
      );
      if (diff) console.log(diff);
    }
    console.log("");
  }

  return hasChanges;
}

function reportSchemas(
  localYaml: string,
  remoteYaml: string
): boolean {
  const localSchemas = extractSchemaBlocks(localYaml);
  const remoteSchemas = extractSchemaBlocks(remoteYaml);

  const added = [...remoteSchemas.keys()].filter(
    (k) => !localSchemas.has(k)
  );
  const removed = [...localSchemas.keys()].filter(
    (k) => !remoteSchemas.has(k)
  );
  const modified = [...remoteSchemas.keys()].filter(
    (k) =>
      localSchemas.has(k) &&
      normalizeRefs(localSchemas.get(k)!) !==
        normalizeRefs(remoteSchemas.get(k)!)
  );

  let hasChanges = false;

  if (added.length > 0) {
    hasChanges = true;
    console.log(`${GREEN}New schemas (${added.length}):${RESET}`);
    for (const s of added.sort()) console.log(`  ${GREEN}+ ${s}${RESET}`);
    console.log("");
  }

  if (removed.length > 0) {
    hasChanges = true;
    console.log(`${RED}Removed schemas (${removed.length}):${RESET}`);
    for (const s of removed.sort()) console.log(`  ${RED}- ${s}${RESET}`);
    console.log("");
  }

  if (modified.length > 0) {
    hasChanges = true;
    console.log(`Modified schemas (${modified.length}):`);
    for (const s of modified.sort()) {
      console.log(`\n  ${BOLD}~ ${s}${RESET}`);
      const diff = formatDiffBlock(
        localSchemas.get(s)!,
        remoteSchemas.get(s)!
      );
      if (diff) console.log(diff);
    }
    console.log("");
  }

  return hasChanges;
}

function reportTags(
  localYaml: string,
  remoteYaml: string
): boolean {
  const localTags = new Set(extractTags(localYaml));
  const remoteTags = new Set(extractTags(remoteYaml));
  const added = [...remoteTags].filter((t) => !localTags.has(t));
  const removed = [...localTags].filter((t) => !remoteTags.has(t));

  let hasChanges = false;

  if (added.length > 0) {
    hasChanges = true;
    console.log(`${GREEN}New tags (${added.length}):${RESET}`);
    for (const t of added.sort()) console.log(`  ${GREEN}+ ${t}${RESET}`);
    console.log("");
  }

  if (removed.length > 0) {
    hasChanges = true;
    console.log(`${RED}Removed tags (${removed.length}):${RESET}`);
    for (const t of removed.sort()) console.log(`  ${RED}- ${t}${RESET}`);
    console.log("");
  }

  return hasChanges;
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
  const remoteYaml = await response.text();
  const localYaml = readFileSync(SPEC_PATH, "utf-8");

  const remoteVersion = parseVersion(remoteYaml);
  const localVersion = parseVersion(localYaml);

  console.log(
    `Spec version: ${BOLD}${localVersion}${RESET} → ${BOLD}${remoteVersion}${RESET}\n`
  );

  if (localVersion === remoteVersion) {
    console.log(`${DIM}Already up to date — no version change.${RESET}\n`);
  }

  console.log(`${BOLD}--- Endpoints ---${RESET}\n`);
  const endpointChanges = reportEndpoints(localYaml, remoteYaml);

  console.log(`${BOLD}--- Schemas ---${RESET}\n`);
  const schemaChanges = reportSchemas(localYaml, remoteYaml);

  console.log(`${BOLD}--- Tags ---${RESET}\n`);
  const tagChanges = reportTags(localYaml, remoteYaml);

  if (!endpointChanges && !schemaChanges && !tagChanges) {
    console.log("No changes detected between local and remote spec.");
  }
}

main();
