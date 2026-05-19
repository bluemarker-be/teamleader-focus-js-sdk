/**
 * Deterministic rendering primitives for audit artifacts.
 *
 * stableStringify is load-bearing: FR-009 (reproducibility) requires
 * byte-identical artifact files on the same SHA, which means object
 * keys must serialize in a deterministic order. Without it, two
 * audit runs at the same commit could produce textually different
 * JSON that semantically agrees, breaking `git diff` semantics.
 */

import { sep as platformSep } from "node:path";

/**
 * JSON serializer with deterministic, recursively-sorted object keys.
 * Equal inputs always produce byte-identical output.
 *
 * `undefined` properties are dropped (matching JSON.stringify behavior).
 * Arrays are not reordered — caller is responsible for sorting them
 * upstream when reproducibility requires it.
 */
export function stableStringify(value: unknown, indent = 2): string {
  return JSON.stringify(value, replacer, indent);

  function replacer(_key: string, v: unknown): unknown {
    if (v === null || typeof v !== "object" || Array.isArray(v)) return v;
    const obj = v as Record<string, unknown>;
    const sorted: Record<string, unknown> = {};
    for (const k of Object.keys(obj).sort()) {
      if (obj[k] !== undefined) sorted[k] = obj[k];
    }
    return sorted;
  }
}

/**
 * Convert any absolute path to a repo-relative POSIX-style path.
 * Used everywhere we write `location.file` so artifacts are byte-identical
 * across host operating systems (FR-009; research Decision 2).
 */
export function toPosixPath(absPath: string, repoRoot: string): string {
  const normRoot = repoRoot.endsWith(platformSep)
    ? repoRoot
    : repoRoot + platformSep;
  let rel = absPath.startsWith(normRoot)
    ? absPath.slice(normRoot.length)
    : absPath;
  if (platformSep !== "/") rel = rel.split(platformSep).join("/");
  return rel;
}

/**
 * Render a markdown table with consistent cell padding so the source
 * lines up readably even before a markdown renderer parses it.
 *
 * Headers length determines the column count; each row is padded or
 * truncated to match. Cell contents are escaped for the markdown
 * table format (pipes → `\|`; newlines → `<br>`).
 */
export function mdTable(headers: string[], rows: string[][]): string {
  if (headers.length === 0) return "";

  const escaped: string[][] = [
    headers.map(escapeCell),
    ...rows.map((row) => {
      const normalized = [...row];
      while (normalized.length < headers.length) normalized.push("");
      normalized.length = headers.length;
      return normalized.map(escapeCell);
    }),
  ];

  const widths = headers.map((_, col) =>
    Math.max(...escaped.map((row) => row[col].length)),
  );

  const renderRow = (row: string[]): string =>
    "| " + row.map((cell, i) => cell.padEnd(widths[i])).join(" | ") + " |";

  const separator =
    "|" + widths.map((w) => "-".repeat(w + 2)).join("|") + "|";

  return [
    renderRow(escaped[0]),
    separator,
    ...escaped.slice(1).map(renderRow),
  ].join("\n");
}

function escapeCell(s: string): string {
  return s.replace(/\|/g, "\\|").replace(/\n/g, "<br>");
}
