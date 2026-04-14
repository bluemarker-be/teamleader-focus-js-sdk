import { TeamleaderClient } from "../../src/index.js";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// ---------------------------------------------------------------------------
// .env persistence
// ---------------------------------------------------------------------------

const ENV_PATH = resolve(process.cwd(), ".env");

/**
 * Rewrites a single key=value pair in the .env file, preserving all other
 * lines (comments, other variables, ordering, trailing newlines).
 *
 * Why: Teamleader refresh tokens are single-use. If we only update
 * process.env, the next test-suite run loads the old (now-revoked) tokens
 * from .env and all requests fail. Persisting to disk keeps .env in sync.
 */
function persistEnvVar(key: string, value: string): void {
  let content: string;
  try {
    content = readFileSync(ENV_PATH, "utf-8");
  } catch {
    // No .env file — nothing to persist to
    return;
  }

  const lines = content.split("\n");
  let replaced = false;
  const updated = lines.map((line) => {
    const eq = line.indexOf("=");
    if (eq === -1) return line;
    const k = line.slice(0, eq).trim();
    if (k !== key) return line;
    replaced = true;
    return `${key}=${value}`;
  });

  if (!replaced) {
    // Key didn't exist — append it (but only if content doesn't already end with the key)
    updated.push(`${key}=${value}`);
  }

  writeFileSync(ENV_PATH, updated.join("\n"), "utf-8");
}

// ---------------------------------------------------------------------------
// Client singleton
// ---------------------------------------------------------------------------

let _client: TeamleaderClient | undefined;

/**
 * Returns a shared TeamleaderClient instance configured from environment
 * variables. Returns a dummy client if ACCESS_TOKEN is missing (tests will
 * be skipped via `describe.skipIf(noToken)` so the dummy is never used).
 */
export function getClient(): TeamleaderClient {
  if (_client) return _client;

  const accessToken = process.env.ACCESS_TOKEN;
  if (!accessToken) {
    // Return a dummy — tests are skipped via noToken guard anyway
    return new TeamleaderClient({ accessToken: "missing" });
  }

  _client = new TeamleaderClient({
    accessToken,
    refreshToken: process.env.REFRESH_TOKEN,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    apiVersion: "2023-09-26",
    maxRetries: 10, // More retries for integration tests (rate limits)
    onTokenRefresh: (tokens) => {
      // Update in-memory env for the current process
      process.env.ACCESS_TOKEN = tokens.access_token;
      process.env.REFRESH_TOKEN = tokens.refresh_token;
      // Persist to .env so next suite run uses the fresh tokens
      try {
        persistEnvVar("ACCESS_TOKEN", tokens.access_token);
        persistEnvVar("REFRESH_TOKEN", tokens.refresh_token);
      } catch (err) {
        console.warn("[setup.ts] Failed to persist tokens to .env:", err);
      }
    },
  });

  return _client;
}

/**
 * Returns true when ACCESS_TOKEN is missing — use with `describe.skipIf()`.
 */
export const noToken = !process.env.ACCESS_TOKEN;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Small delay to be gentle on rate limits */
export function delay(ms = 100): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Run an array of cleanup functions, ignoring individual failures so the
 * rest of the teardown still executes.
 */
export async function cleanupAll(fns: Array<() => Promise<unknown>>): Promise<void> {
  for (const fn of fns) {
    try {
      await fn();
    } catch {
      // ignore cleanup errors
    }
  }
}

/**
 * Formats a date as YYYY-MM-DD for API params.
 */
export function isoDate(d: Date = new Date()): string {
  return d.toISOString().slice(0, 10);
}

/**
 * Returns an ISO datetime string for API params (e.g. starts_at, ends_at).
 * Offset from now by the given number of hours.
 * Format: "2025-02-09T10:34:19+00:00" (no milliseconds, required by TL API).
 */
export function isoDateTime(hoursFromNow = 1): string {
  const d = new Date();
  d.setHours(d.getHours() + hoursFromNow);
  return d.toISOString().slice(0, 19) + "+00:00";
}

/**
 * Returns a future date string (YYYY-MM-DD), offset from today.
 */
export function futureDate(daysFromNow = 30): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return isoDate(d);
}
