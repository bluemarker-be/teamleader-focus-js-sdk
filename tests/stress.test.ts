import { describe, it, expect } from "vitest";
import { TeamleaderFocusClient } from "../src/client.js";

/**
 * Concurrency stress tests — run many parallel requests against a mock fetch
 * that simulates real API conditions (401s, 429s, 500s, slow responses) and
 * verify the client's refresh mutex, retry backoff, and bookkeeping hold up.
 */

type CallLog = { url: string; hadAuth: string | undefined };

/**
 * Creates a mock fetch that:
 * - returns 401 on the first `initial401Count` API calls
 * - handles OAuth refresh endpoint deterministically with small latency
 * - returns 200 with body { data: [{ id }] } thereafter
 */
function makeAuthMock(opts: {
  initial401Count: number;
  refreshLatencyMs: number;
  onRefresh?: () => void;
}) {
  const calls: CallLog[] = [];
  let apiCallsSeen = 0;
  let refreshCallsSeen = 0;

  const fetchFn = (async (url: string | URL | Request, init?: RequestInit) => {
    const urlStr = url.toString();
    const headers = new Headers(init?.headers as HeadersInit);
    calls.push({ url: urlStr, hadAuth: headers.get("authorization") ?? undefined });

    if (urlStr.includes("oauth2/access_token")) {
      refreshCallsSeen++;
      opts.onRefresh?.();
      await new Promise((r) => setTimeout(r, opts.refreshLatencyMs));
      return new Response(
        JSON.stringify({
          access_token: `fresh-${refreshCallsSeen}`,
          refresh_token: `fresh-refresh-${refreshCallsSeen}`,
          token_type: "Bearer",
          expires_in: 3600,
        }),
        { status: 200, headers: { "content-type": "application/json" } },
      );
    }

    apiCallsSeen++;
    if (apiCallsSeen <= opts.initial401Count) {
      return new Response(JSON.stringify({ error: "invalid_token" }), {
        status: 401,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ data: [{ id: String(apiCallsSeen) }] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof globalThis.fetch;

  return {
    fetchFn,
    calls,
    get refreshCallsSeen() {
      return refreshCallsSeen;
    },
    get apiCallsSeen() {
      return apiCallsSeen;
    },
  };
}

describe("concurrency stress", () => {
  it("50 concurrent requests all hitting 401 share a single token refresh", async () => {
    const mock = makeAuthMock({ initial401Count: 50, refreshLatencyMs: 20 });

    const client = new TeamleaderFocusClient({
      accessToken: "expired",
      refreshToken: "old-refresh",
      clientId: "cid",
      clientSecret: "csec",
      fetch: mock.fetchFn,
    });

    const promises = Array.from({ length: 50 }, (_, i) =>
      client.request<{ data: { id: string }[] }>("/contacts.info", { id: `c-${i}` }),
    );

    const results = await Promise.all(promises);

    expect(results).toHaveLength(50);
    for (const r of results) {
      expect(r.data).toHaveLength(1);
    }

    // Exactly one refresh call despite 50 concurrent 401s
    expect(mock.refreshCallsSeen).toBe(1);

    // Every retry used a fresh token (only the first 50 could have used "expired")
    const postRefreshCalls = mock.calls.filter(
      (c) => !c.url.includes("oauth2/access_token") && c.hadAuth !== "Bearer expired",
    );
    expect(postRefreshCalls.length).toBe(50);
  });

  it("concurrent requests that mix 401 and 429 both recover cleanly", async () => {
    const calls: CallLog[] = [];
    let seen = 0;
    let refreshed = false;

    const fetchFn = (async (url: string | URL | Request, init?: RequestInit) => {
      const urlStr = url.toString();
      const headers = new Headers(init?.headers as HeadersInit);
      calls.push({ url: urlStr, hadAuth: headers.get("authorization") ?? undefined });

      if (urlStr.includes("oauth2/access_token")) {
        refreshed = true;
        await new Promise((r) => setTimeout(r, 10));
        return new Response(
          JSON.stringify({
            access_token: "fresh",
            refresh_token: "fresh-refresh",
            token_type: "Bearer",
            expires_in: 3600,
          }),
          { status: 200, headers: { "content-type": "application/json" } },
        );
      }

      seen++;
      // First 5 API calls: 401 (forcing refresh)
      if (!refreshed && seen <= 5) {
        return new Response(JSON.stringify({ error: "invalid" }), {
          status: 401,
          headers: { "content-type": "application/json" },
        });
      }
      // Next 5 after refresh: 429 with short retry-after
      if (refreshed && seen <= 10) {
        return new Response(JSON.stringify({ error: "rate_limit" }), {
          status: 429,
          headers: {
            "content-type": "application/json",
            "X-RateLimit-Reset": new Date(Date.now() + 100).toISOString(),
          },
        });
      }
      return new Response(JSON.stringify({ data: [{ id: String(seen) }] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }) as typeof globalThis.fetch;

    const client = new TeamleaderFocusClient({
      accessToken: "expired",
      refreshToken: "old-refresh",
      clientId: "cid",
      clientSecret: "csec",
      fetch: fetchFn,
      maxRetries: 5,
    });

    const results = await Promise.all(
      Array.from({ length: 5 }, (_, i) =>
        client.request<{ data: { id: string }[] }>("/contacts.info", { id: `c-${i}` }),
      ),
    );

    expect(results).toHaveLength(5);
    for (const r of results) {
      expect(r.data).toHaveLength(1);
    }
  });

  it("getTokens callback is consulted safely under parallel load", async () => {
    const mock = makeAuthMock({ initial401Count: 0, refreshLatencyMs: 5 });
    let getTokensCalls = 0;

    const client = new TeamleaderFocusClient({
      accessToken: "tok",
      getTokens: async () => {
        getTokensCalls++;
        return { access_token: "tok", refresh_token: "r" };
      },
      fetch: mock.fetchFn,
    });

    await Promise.all(
      Array.from({ length: 100 }, (_, i) =>
        client.request<{ data: unknown[] }>("/contacts.info", { id: `c-${i}` }),
      ),
    );

    // No 401s → getTokens should never be called (only consulted on 401)
    expect(getTokensCalls).toBe(0);
    // All 100 requests made
    expect(mock.apiCallsSeen).toBe(100);
  });

  it("rate-limited paginator backs off and completes full iteration", async () => {
    const calls: CallLog[] = [];
    let pageRequests = 0;
    let ratelimitsIssued = 0;

    const fetchFn = (async (url: string | URL | Request, init?: RequestInit) => {
      const urlStr = url.toString();
      const headers = new Headers(init?.headers as HeadersInit);
      calls.push({ url: urlStr, hadAuth: headers.get("authorization") ?? undefined });

      pageRequests++;
      // Every 3rd real request: 429, then succeed
      if (pageRequests % 3 === 0 && ratelimitsIssued < 3) {
        ratelimitsIssued++;
        return new Response(JSON.stringify({ error: "rate" }), {
          status: 429,
          headers: {
            "content-type": "application/json",
            "X-RateLimit-Reset": new Date(Date.now() + 50).toISOString(),
          },
        });
      }

      // Return 3 pages of 2 items each, then empty
      const body = JSON.parse(init?.body as string) as { page: { number: number } };
      const pageNum = body.page.number;
      if (pageNum > 3) {
        return new Response(JSON.stringify({ data: [] }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }
      return new Response(
        JSON.stringify({
          data: [{ id: `${pageNum}-a` }, { id: `${pageNum}-b` }],
          meta: { page: { size: 2, number: pageNum }, matches: 6 },
        }),
        { status: 200, headers: { "content-type": "application/json" } },
      );
    }) as typeof globalThis.fetch;

    const client = new TeamleaderFocusClient({
      accessToken: "tok",
      fetch: fetchFn,
      maxRetries: 5,
    });

    const items: { id: string }[] = [];
    for await (const item of client.paginateItems<{ id: string }>(
      "/contacts.list",
      { page: { size: 2 } },
    )) {
      items.push(item);
    }

    // 3 pages × 2 items = 6 items despite intermittent 429s
    expect(items.map((i) => i.id)).toEqual([
      "1-a", "1-b", "2-a", "2-b", "3-a", "3-b",
    ]);
    // We should have retried the 429 responses
    expect(ratelimitsIssued).toBeGreaterThan(0);
  });

  it("AbortSignal stops a long-running paginator mid-iteration", async () => {
    const fetchFn = (async (_url: string | URL | Request, init?: RequestInit) => {
      const body = JSON.parse(init?.body as string) as { page: { number: number } };
      // Return full pages indefinitely — signal should cut us off
      return new Response(
        JSON.stringify({
          data: [{ id: `${body.page.number}-a` }, { id: `${body.page.number}-b` }],
          meta: { page: { size: 2, number: body.page.number }, matches: 10000 },
        }),
        { status: 200, headers: { "content-type": "application/json" } },
      );
    }) as typeof globalThis.fetch;

    const client = new TeamleaderFocusClient({ accessToken: "tok", fetch: fetchFn });

    const controller = new AbortController();
    const items: { id: string }[] = [];

    const iteratePromise = (async () => {
      for await (const item of client.paginateItems<{ id: string }>(
        "/contacts.list",
        { page: { size: 2 } },
        { signal: controller.signal },
      )) {
        items.push(item);
        if (items.length >= 10) {
          controller.abort();
        }
      }
    })();

    await expect(iteratePromise).rejects.toThrow(/abort/i);
    // We collected 10 items, maybe one more before the abort took effect
    expect(items.length).toBeLessThanOrEqual(12);
    expect(items.length).toBeGreaterThanOrEqual(10);
  });

  it("onTokenRefresh callback is invoked exactly once per refresh, even under parallel load", async () => {
    const mock = makeAuthMock({ initial401Count: 20, refreshLatencyMs: 10 });
    let callbackInvocations = 0;

    const client = new TeamleaderFocusClient({
      accessToken: "expired",
      refreshToken: "old-refresh",
      clientId: "cid",
      clientSecret: "csec",
      fetch: mock.fetchFn,
      onTokenRefresh: () => {
        callbackInvocations++;
      },
    });

    await Promise.all(
      Array.from({ length: 20 }, (_, i) =>
        client.request("/contacts.info", { id: `c-${i}` }),
      ),
    );

    // One refresh = one callback, regardless of how many concurrent requests triggered it
    expect(callbackInvocations).toBe(1);
  });
});
