import { TeamleaderClient } from "../../src/index.js";

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
      // Update the in-memory env so subsequent client recreation uses new tokens
      process.env.ACCESS_TOKEN = tokens.access_token;
      process.env.REFRESH_TOKEN = tokens.refresh_token;
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
