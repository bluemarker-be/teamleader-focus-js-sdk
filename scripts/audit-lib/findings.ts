/**
 * Finding-ID generation + trivial/non-trivial classification.
 *
 * The ID is content-derived (SHA-256 of a canonical fingerprint,
 * truncated to 16 hex chars) per research Decision 3. Stable within
 * one audit run on one SHA; not stable across runs at different SHAs
 * (because the underlying fingerprint shifts with code changes).
 *
 * The classifier codifies FR-008's trivial/non-trivial rule literally.
 */

import { createHash } from "node:crypto";

import type {
  Classification,
  Finding,
  Location,
  Principle,
} from "./types.js";

type FindingFingerprint = Pick<
  Finding,
  "category" | "principle" | "location" | "message"
>;

/**
 * Compute the run-local Finding `id` from a canonical fingerprint.
 * Same fingerprint → same ID, deterministically.
 */
export function computeFindingId(f: FindingFingerprint): string {
  const fingerprint = canonicalFingerprint(
    f.category,
    f.principle,
    f.location,
    f.message,
  );
  return createHash("sha256").update(fingerprint).digest("hex").slice(0, 16);
}

function canonicalFingerprint(
  category: string,
  principle: Principle | null,
  location: Location,
  message: string,
): string {
  return [
    category,
    location.file,
    principle ?? "-",
    `${location.start_line}-${location.end_line}`,
    message,
  ].join("|");
}

/**
 * Inputs to FR-008's trivial/non-trivial classification. The producer
 * supplies these from its own analysis context — the classifier itself
 * is a pure function of them.
 */
export interface ClassificationInputs {
  /** Number of files this fix would touch. 1 = single file. */
  files_touched: number;
  /** True if the fix adds, removes, renames, or changes any exported symbol. */
  changes_public_api: boolean;
  /** True if the fix is observable to a caller (return value, error, side effect). */
  changes_behavior: boolean;
}

/**
 * FR-008 verbatim: trivial = single file AND no public-API surface change
 * AND no behavior change observable to a caller. Anything else is non-trivial.
 */
export function classifyFinding(inputs: ClassificationInputs): Classification {
  if (
    inputs.files_touched === 1 &&
    !inputs.changes_public_api &&
    !inputs.changes_behavior
  ) {
    return "trivial";
  }
  return "non-trivial";
}
