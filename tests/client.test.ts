import { describe, it, expect, vi } from "vitest";
import { TeamleaderFocusClient } from "../src/client.js";
import {
  TeamleaderFocusError,
  TeamleaderFocusAuthenticationError,
  TeamleaderFocusTokenRefreshError,
  TeamleaderFocusValidationError,
  TeamleaderFocusRateLimitError,
  TeamleaderFocusNetworkError,
} from "../src/errors.js";
import { mockFetch, mockFetchSequence } from "./helpers.js";

describe("TeamleaderFocusClient", () => {
  it("sends POST requests with correct headers", async () => {
    const { fetchFn, calls } = mockFetch({ body: { data: [] } });
    const client = new TeamleaderFocusClient({ accessToken: "test-token", fetch: fetchFn });

    await client.contacts.info({ id: "abc" });

    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe("https://api.focus.teamleader.eu/contacts.info");
    expect(calls[0].init.method).toBe("POST");
    expect(calls[0].init.headers).toEqual({
      "Content-Type": "application/json",
      Authorization: "Bearer test-token",
    });
  });

  it("sends request body as JSON", async () => {
    const { fetchFn, calls } = mockFetch({ body: { data: [] } });
    const client = new TeamleaderFocusClient({ accessToken: "tok", fetch: fetchFn });

    await client.contacts.info({ id: "abc-123" });

    const body = JSON.parse(calls[0].init.body as string);
    expect(body).toEqual({
      id: "abc-123",
    });
  });

  it("returns parsed JSON response", async () => {
    const contactData = { data: [{ id: "abc-123", first_name: "John" }] };
    const { fetchFn } = mockFetch({ body: contactData });
    const client = new TeamleaderFocusClient({ accessToken: "tok", fetch: fetchFn });

    const result = await client.contacts.info({ id: "abc" });
    expect(result).toEqual(contactData);
  });

  it("handles 204 No Content (update/delete)", async () => {
    const { fetchFn } = mockFetch({ status: 204 });
    const client = new TeamleaderFocusClient({ accessToken: "tok", fetch: fetchFn });

    const result = await client.contacts.delete({ id: "abc-123" });
    expect(result).toBeUndefined();
  });

  it("throws TeamleaderFocusAuthenticationError on 401", async () => {
    const { fetchFn } = mockFetch({
      status: 401,
      body: { error: "invalid_token" },
    });
    const client = new TeamleaderFocusClient({ accessToken: "bad-token", fetch: fetchFn });

    await expect(client.contacts.info({ id: "abc" })).rejects.toThrow(TeamleaderFocusAuthenticationError);
  });

  it("throws TeamleaderFocusValidationError on 400", async () => {
    const { fetchFn } = mockFetch({
      status: 400,
      body: { message: "Invalid filter" },
    });
    const client = new TeamleaderFocusClient({ accessToken: "tok", fetch: fetchFn });

    await expect(client.contacts.info({ id: "abc" })).rejects.toThrow(TeamleaderFocusValidationError);
  });

  it("throws TeamleaderFocusValidationError on 422", async () => {
    const { fetchFn } = mockFetch({
      status: 422,
      body: { message: "Missing required field" },
    });
    const client = new TeamleaderFocusClient({ accessToken: "tok", fetch: fetchFn });

    await expect(client.contacts.info({ id: "abc" })).rejects.toThrow(TeamleaderFocusValidationError);
  });

  it("retries on 429 rate limit and succeeds", async () => {
    // Teamleader returns X-RateLimit-Reset as ISO 8601 datetime
    const resetDate = new Date(Date.now() - 1000); // reset in the past = retry immediately
    const { fetchFn, calls } = mockFetchSequence([
      {
        status: 429,
        body: { error: "rate_limit" },
        headers: {
          "content-type": "application/json",
          "X-RateLimit-Reset": resetDate.toISOString(),
        },
      },
      { status: 200, body: { data: [{ id: "1" }] } },
    ]);
    const client = new TeamleaderFocusClient({
      accessToken: "tok",
      fetch: fetchFn,
      maxRetries: 3,
    });

    const result = await client.contacts.info({ id: "abc" });
    expect(calls).toHaveLength(2);
    expect(result).toEqual({ data: [{ id: "1" }] });
  });

  it("throws TeamleaderFocusRateLimitError after max retries", async () => {
    const resetDate = new Date(Date.now() - 1000);
    const { fetchFn } = mockFetch({
      status: 429,
      body: { error: "rate_limit" },
      headers: {
        "content-type": "application/json",
        "X-RateLimit-Reset": resetDate.toISOString(),
      },
    });
    const client = new TeamleaderFocusClient({
      accessToken: "tok",
      fetch: fetchFn,
      maxRetries: 0,  // no retries
    });

    await expect(client.contacts.info({ id: "abc" })).rejects.toThrow(TeamleaderFocusRateLimitError);
  });

  it("uses custom baseUrl", async () => {
    const { fetchFn, calls } = mockFetch({ body: { data: [] } });
    const client = new TeamleaderFocusClient({
      accessToken: "tok",
      fetch: fetchFn,
      baseUrl: "https://custom.api.example.com",
    });

    await client.contacts.info({ id: "abc" });
    expect(calls[0].url).toBe("https://custom.api.example.com/contacts.info");
  });

  it("sends X-API-Version header when apiVersion is set", async () => {
    const { fetchFn, calls } = mockFetch({ body: { data: [] } });
    const client = new TeamleaderFocusClient({
      accessToken: "tok",
      fetch: fetchFn,
      apiVersion: "2023-09-26",
    });

    await client.contacts.info({ id: "abc" });

    expect(calls[0].init.headers).toEqual({
      "Content-Type": "application/json",
      Authorization: "Bearer tok",
      "X-API-Version": "2023-09-26",
    });
  });

  it("does not send X-API-Version header when apiVersion is not set", async () => {
    const { fetchFn, calls } = mockFetch({ body: { data: [] } });
    const client = new TeamleaderFocusClient({ accessToken: "tok", fetch: fetchFn });

    await client.contacts.info({ id: "abc" });

    expect(calls[0].init.headers).not.toHaveProperty("X-API-Version");
  });

  it("refreshes token on 401 when refresh credentials are provided", async () => {
    const tokenResponse = {
      access_token: "new-token",
      refresh_token: "new-refresh",
      token_type: "Bearer",
      expires_in: 3600,
    };

    const { fetchFn, calls } = mockFetchSequence([
      // First call: 401
      { status: 401, body: { error: "invalid_token" } },
      // Token refresh call
      { status: 200, body: tokenResponse },
      // Retry after refresh: success
      { status: 200, body: { data: [{ id: "1" }] } },
    ]);

    let refreshedTokens: unknown = null;
    const client = new TeamleaderFocusClient({
      accessToken: "old-token",
      refreshToken: "old-refresh",
      clientId: "client-id",
      clientSecret: "client-secret",
      onTokenRefresh: (tokens) => { refreshedTokens = tokens; },
      fetch: fetchFn,
    });

    const result = await client.contacts.info({ id: "abc" });

    expect(calls).toHaveLength(3);
    expect(result).toEqual({ data: [{ id: "1" }] });
    expect(refreshedTokens).toEqual(tokenResponse);
    // Third call should use the new token
    expect((calls[2].init.headers as Record<string, string>).Authorization).toBe("Bearer new-token");
  });

  it("does not refresh more than once per request (prevents infinite loop)", async () => {
    const { fetchFn, calls } = mockFetchSequence([
      { status: 401, body: { error: "invalid_token" } },
      // Token refresh
      {
        status: 200,
        body: { access_token: "new", refresh_token: "new-r", token_type: "Bearer", expires_in: 3600 },
      },
      // Still 401 after refresh
      { status: 401, body: { error: "still_invalid" } },
    ]);

    const client = new TeamleaderFocusClient({
      accessToken: "tok",
      refreshToken: "ref",
      clientId: "cid",
      clientSecret: "csec",
      fetch: fetchFn,
    });

    await expect(client.contacts.info({ id: "abc" })).rejects.toThrow(TeamleaderFocusAuthenticationError);
    expect(calls).toHaveLength(3); // original + refresh + retry (no more)
  });

  it("handles network errors gracefully", async () => {
    const fetchFn = async () => {
      throw new TypeError("Failed to fetch");
    };
    const client = new TeamleaderFocusClient({
      accessToken: "tok",
      fetch: fetchFn as typeof globalThis.fetch,
    });

    await expect(client.contacts.info({ id: "abc" })).rejects.toThrow(TeamleaderFocusNetworkError);
  });

  it("retries on 500/502/503 server errors and succeeds", async () => {
    const { fetchFn, calls } = mockFetchSequence([
      { status: 503, body: { error: "service_unavailable" } },
      { status: 200, body: { data: [{ id: "1" }] } },
    ]);
    const client = new TeamleaderFocusClient({
      accessToken: "tok",
      fetch: fetchFn,
      maxRetries: 3,
    });

    const result = await client.contacts.info({ id: "abc" });
    expect(calls).toHaveLength(2);
    expect(result).toEqual({ data: [{ id: "1" }] });
  });

  it("throws after max retries on persistent server errors", async () => {
    const { fetchFn } = mockFetch({
      status: 500,
      body: { error: "internal_server_error" },
    });
    const client = new TeamleaderFocusClient({
      accessToken: "tok",
      fetch: fetchFn,
      maxRetries: 0,
    });

    await expect(client.contacts.info({ id: "abc" })).rejects.toThrow(TeamleaderFocusError);
  });

  it("updates refreshToken after successful token refresh", async () => {
    const { fetchFn, calls } = mockFetchSequence([
      // First call: 401
      { status: 401, body: { error: "invalid_token" } },
      // Token refresh: returns new tokens
      { status: 200, body: { access_token: "new-at", refresh_token: "new-rt", token_type: "Bearer", expires_in: 3600 } },
      // Retry: success
      { status: 200, body: { data: [{ id: "1" }] } },
      // Second call: 401 again (to test new refresh token is used)
      { status: 401, body: { error: "expired_again" } },
      // Second refresh: should use "new-rt" as refresh token
      { status: 200, body: { access_token: "newer-at", refresh_token: "newer-rt", token_type: "Bearer", expires_in: 3600 } },
      // Retry: success
      { status: 200, body: { data: [{ id: "2" }] } },
    ]);

    const client = new TeamleaderFocusClient({
      accessToken: "old-at",
      refreshToken: "old-rt",
      clientId: "cid",
      clientSecret: "csec",
      fetch: fetchFn,
    });

    await client.contacts.info({ id: "abc" });
    const result = await client.contacts.info({ id: "abc" });
    expect(result).toEqual({ data: [{ id: "2" }] });

    // The second refresh call (calls[4]) should use the new refresh token
    const secondRefreshBody = new URLSearchParams(calls[4].init.body as string);
    expect(secondRefreshBody.get("refresh_token")).toBe("new-rt");
  });

  it("throws TeamleaderFocusNetworkError on request timeout", async () => {
    // Create a fetch that never resolves, simulating a hung connection
    const fetchFn = (async (_url: string | URL | Request, init?: RequestInit) => {
      return new Promise<Response>((_resolve, reject) => {
        // Listen for abort signal
        init?.signal?.addEventListener("abort", () => {
          reject(new DOMException("The operation was aborted.", "AbortError"));
        });
      });
    }) as typeof globalThis.fetch;

    const client = new TeamleaderFocusClient({
      accessToken: "tok",
      fetch: fetchFn,
      timeout: 50, // 50ms timeout for fast test
    });

    await expect(client.contacts.info({ id: "abc" })).rejects.toThrow(TeamleaderFocusNetworkError);
    await expect(client.contacts.info({ id: "abc" })).rejects.toThrow(/timed out/);
  });

  it("deduplicates concurrent token refreshes (refreshPromise mutex)", async () => {
    let refreshCallCount = 0;
    const tokenResponse = {
      access_token: "refreshed-token",
      refresh_token: "refreshed-refresh",
      token_type: "Bearer",
      expires_in: 3600,
    };

    // We need a custom fetch that:
    // 1. Returns 401 for the first two API calls (concurrent requests)
    // 2. Returns success for the refresh call
    // 3. Returns success for the two retried API calls
    let callIndex = 0;
    const calls: Array<{ url: string }> = [];
    const fetchFn = (async (url: string | URL | Request, _init?: RequestInit) => {
      const urlStr = url.toString();
      calls.push({ url: urlStr });

      // Token refresh endpoint
      if (urlStr.includes("oauth2/access_token")) {
        refreshCallCount++;
        // Small delay to simulate network latency
        await new Promise((r) => setTimeout(r, 10));
        return new Response(JSON.stringify(tokenResponse), {
          status: 200,
          headers: new Headers({ "content-type": "application/json" }),
        });
      }

      // API calls: first two return 401, subsequent ones succeed
      callIndex++;
      if (callIndex <= 2) {
        return new Response(JSON.stringify({ error: "invalid_token" }), {
          status: 401,
          headers: new Headers({ "content-type": "application/json" }),
        });
      }
      return new Response(JSON.stringify({ data: [{ id: "ok" }] }), {
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
      });
    }) as typeof globalThis.fetch;

    const client = new TeamleaderFocusClient({
      accessToken: "expired-token",
      refreshToken: "old-refresh",
      clientId: "cid",
      clientSecret: "csec",
      fetch: fetchFn,
    });

    // Fire two requests concurrently — both should hit 401 and share one refresh
    const [r1, r2] = await Promise.all([
      client.contacts.info({ id: "abc" }),
      client.companies.info({ id: "xyz" }),
    ]);

    expect(r1).toEqual({ data: [{ id: "ok" }] });
    expect(r2).toEqual({ data: [{ id: "ok" }] });
    // Only ONE refresh call should have been made
    expect(refreshCallCount).toBe(1);
  });

  it("succeeds even when onTokenRefresh callback throws", async () => {
    const { fetchFn, calls } = mockFetchSequence([
      { status: 401, body: { error: "invalid_token" } },
      {
        status: 200,
        body: { access_token: "new-at", refresh_token: "new-rt", token_type: "Bearer", expires_in: 3600 },
      },
      { status: 200, body: { data: [{ id: "1" }] } },
    ]);

    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const client = new TeamleaderFocusClient({
      accessToken: "old-at",
      refreshToken: "old-rt",
      clientId: "cid",
      clientSecret: "csec",
      onTokenRefresh: () => { throw new Error("DB write failed"); },
      fetch: fetchFn,
    });

    // Request should still succeed despite callback failure
    const result = await client.contacts.info({ id: "abc" });
    expect(result).toEqual({ data: [{ id: "1" }] });
    expect(calls).toHaveLength(3);

    // The error should have been logged
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("onTokenRefresh callback failed"),
      expect.any(Error),
    );

    consoleErrorSpy.mockRestore();
  });

  it("returns undefined for non-JSON success response", async () => {
    const fetchFn = (async () => {
      return new Response("OK", {
        status: 200,
        headers: new Headers({ "content-type": "text/plain" }),
      });
    }) as typeof globalThis.fetch;

    const client = new TeamleaderFocusClient({ accessToken: "tok", fetch: fetchFn });
    const result = await client.contacts.info({ id: "abc" });
    expect(result).toBeUndefined();
  });

  describe("getTokens", () => {
    it("uses fresh tokens from getTokens on 401 without needing refresh", async () => {
      const { fetchFn, calls } = mockFetchSequence([
        // First call: 401 (stale token)
        { status: 401, body: { error: "invalid_token" } },
        // Retry after getTokens: success
        { status: 200, body: { data: [{ id: "1" }] } },
      ]);

      const getTokens = vi.fn().mockReturnValue({
        access_token: "fresh-token",
        refresh_token: "fresh-refresh",
      });

      const client = new TeamleaderFocusClient({
        accessToken: "stale-token",
        getTokens,
        fetch: fetchFn,
      });

      const result = await client.contacts.info({ id: "abc" });

      expect(getTokens).toHaveBeenCalledOnce();
      expect(calls).toHaveLength(2);
      expect(result).toEqual({ data: [{ id: "1" }] });
      // Retry should use the fresh token
      expect((calls[1].init.headers as Record<string, string>).Authorization).toBe("Bearer fresh-token");
    });

    it("falls through to refresh when getTokens returns same token", async () => {
      const tokenResponse = {
        access_token: "refreshed-token",
        refresh_token: "refreshed-refresh",
        token_type: "Bearer",
        expires_in: 3600,
      };

      const { fetchFn, calls } = mockFetchSequence([
        // First call: 401
        { status: 401, body: { error: "invalid_token" } },
        // Token refresh call
        { status: 200, body: tokenResponse },
        // Retry after refresh: success
        { status: 200, body: { data: [{ id: "1" }] } },
      ]);

      const getTokens = vi.fn().mockReturnValue({
        access_token: "stale-token", // same as current — no change
        refresh_token: "old-refresh",
      });

      const client = new TeamleaderFocusClient({
        accessToken: "stale-token",
        refreshToken: "old-refresh",
        clientId: "cid",
        clientSecret: "csec",
        getTokens,
        fetch: fetchFn,
      });

      const result = await client.contacts.info({ id: "abc" });

      expect(getTokens).toHaveBeenCalledOnce();
      expect(calls).toHaveLength(3); // original + refresh + retry
      expect(result).toEqual({ data: [{ id: "1" }] });
      expect((calls[2].init.headers as Record<string, string>).Authorization).toBe("Bearer refreshed-token");
    });

    it("falls back to getTokens when refresh fails (another process refreshed)", async () => {
      const { fetchFn, calls } = mockFetchSequence([
        // First call: 401
        { status: 401, body: { error: "invalid_token" } },
        // Token refresh: fails (refresh token already consumed by another process)
        { status: 401, body: { errors: [{ meta: { hint: "refresh token not linked to client" } }] } },
        // Retry after fallback getTokens: success
        { status: 200, body: { data: [{ id: "1" }] } },
      ]);

      let getTokensCallCount = 0;
      const getTokens = vi.fn().mockImplementation(() => {
        getTokensCallCount++;
        if (getTokensCallCount === 1) {
          // First call: same token (no change yet)
          return { access_token: "stale-token", refresh_token: "stale-refresh" };
        }
        // Second call: another process has refreshed
        return { access_token: "other-process-token", refresh_token: "other-process-refresh" };
      });

      const client = new TeamleaderFocusClient({
        accessToken: "stale-token",
        refreshToken: "stale-refresh",
        clientId: "cid",
        clientSecret: "csec",
        getTokens,
        fetch: fetchFn,
      });

      const result = await client.contacts.info({ id: "abc" });

      expect(getTokens).toHaveBeenCalledTimes(2);
      expect(calls).toHaveLength(3); // original + failed refresh + retry
      expect(result).toEqual({ data: [{ id: "1" }] });
      expect((calls[2].init.headers as Record<string, string>).Authorization).toBe("Bearer other-process-token");
    });

    it("throws refresh error when both refresh and fallback getTokens fail", async () => {
      const { fetchFn } = mockFetchSequence([
        // First call: 401
        { status: 401, body: { error: "invalid_token" } },
        // Token refresh: fails
        { status: 401, body: { errors: [{ meta: { hint: "refresh token not linked to client" } }] } },
      ]);

      const getTokens = vi.fn().mockReturnValue({
        access_token: "stale-token", // always returns same token — no other process refreshed
        refresh_token: "stale-refresh",
      });

      const client = new TeamleaderFocusClient({
        accessToken: "stale-token",
        refreshToken: "stale-refresh",
        clientId: "cid",
        clientSecret: "csec",
        getTokens,
        fetch: fetchFn,
      });

      await expect(client.contacts.info({ id: "abc" })).rejects.toThrow(TeamleaderFocusTokenRefreshError);
      expect(getTokens).toHaveBeenCalledTimes(2); // once before refresh, once after
    });

    it("works with getTokens and without OAuth credentials (re-read only)", async () => {
      const { fetchFn, calls } = mockFetchSequence([
        // First call: 401
        { status: 401, body: { error: "invalid_token" } },
        // Retry after getTokens: success
        { status: 200, body: { data: [{ id: "1" }] } },
      ]);

      const getTokens = vi.fn().mockReturnValue({
        access_token: "fresh-token",
        refresh_token: "fresh-refresh",
      });

      // No clientId/clientSecret — cannot do OAuth refresh, only getTokens
      const client = new TeamleaderFocusClient({
        getTokens,
        fetch: fetchFn,
      });

      const result = await client.contacts.info({ id: "abc" });

      expect(getTokens).toHaveBeenCalledOnce();
      expect(calls).toHaveLength(2);
      expect(result).toEqual({ data: [{ id: "1" }] });
    });

    it("throws auth error when getTokens returns unchanged token and no OAuth credentials", async () => {
      const { fetchFn } = mockFetchSequence([
        { status: 401, body: { error: "invalid_token" } },
      ]);

      const getTokens = vi.fn().mockReturnValue({
        access_token: "same-token",
        refresh_token: "some-refresh",
      });

      const client = new TeamleaderFocusClient({
        accessToken: "same-token",
        getTokens,
        fetch: fetchFn,
      });

      await expect(client.contacts.info({ id: "abc" })).rejects.toThrow(TeamleaderFocusAuthenticationError);
      expect(getTokens).toHaveBeenCalledOnce();
    });

    it("without getTokens works as before (backwards compatible)", async () => {
      const tokenResponse = {
        access_token: "new-token",
        refresh_token: "new-refresh",
        token_type: "Bearer",
        expires_in: 3600,
      };

      const { fetchFn, calls } = mockFetchSequence([
        { status: 401, body: { error: "invalid_token" } },
        { status: 200, body: tokenResponse },
        { status: 200, body: { data: [{ id: "1" }] } },
      ]);

      const client = new TeamleaderFocusClient({
        accessToken: "old-token",
        refreshToken: "old-refresh",
        clientId: "cid",
        clientSecret: "csec",
        fetch: fetchFn,
      });

      const result = await client.contacts.info({ id: "abc" });
      expect(calls).toHaveLength(3);
      expect(result).toEqual({ data: [{ id: "1" }] });
    });
  });
});
