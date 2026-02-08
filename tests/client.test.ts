import { describe, it, expect } from "vitest";
import { TeamleaderClient } from "../src/client.js";
import {
  TeamleaderError,
  TeamleaderAuthenticationError,
  TeamleaderValidationError,
  TeamleaderRateLimitError,
  TeamleaderNetworkError,
} from "../src/errors.js";
import { mockFetch, mockFetchSequence } from "./helpers.js";

describe("TeamleaderClient", () => {
  it("sends POST requests with correct headers", async () => {
    const { fetchFn, calls } = mockFetch({ body: { data: [] } });
    const client = new TeamleaderClient({ accessToken: "test-token", fetch: fetchFn });

    await client.contacts.list();

    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe("https://api.focus.teamleader.eu/contacts.list");
    expect(calls[0].init.method).toBe("POST");
    expect(calls[0].init.headers).toEqual({
      "Content-Type": "application/json",
      Authorization: "Bearer test-token",
    });
  });

  it("sends request body as JSON", async () => {
    const { fetchFn, calls } = mockFetch({ body: { data: [] } });
    const client = new TeamleaderClient({ accessToken: "tok", fetch: fetchFn });

    await client.contacts.list({ filter: { term: "John" }, page: { size: 10, number: 1 } });

    const body = JSON.parse(calls[0].init.body as string);
    expect(body).toEqual({
      filter: { term: "John" },
      page: { size: 10, number: 1 },
    });
  });

  it("returns parsed JSON response", async () => {
    const contactData = { data: [{ id: "abc-123", first_name: "John" }] };
    const { fetchFn } = mockFetch({ body: contactData });
    const client = new TeamleaderClient({ accessToken: "tok", fetch: fetchFn });

    const result = await client.contacts.list();
    expect(result).toEqual(contactData);
  });

  it("handles 204 No Content (update/delete)", async () => {
    const { fetchFn } = mockFetch({ status: 204 });
    const client = new TeamleaderClient({ accessToken: "tok", fetch: fetchFn });

    const result = await client.contacts.delete({ id: "abc-123" });
    expect(result).toBeUndefined();
  });

  it("throws TeamleaderAuthenticationError on 401", async () => {
    const { fetchFn } = mockFetch({
      status: 401,
      body: { error: "invalid_token" },
    });
    const client = new TeamleaderClient({ accessToken: "bad-token", fetch: fetchFn });

    await expect(client.contacts.list()).rejects.toThrow(TeamleaderAuthenticationError);
  });

  it("throws TeamleaderValidationError on 400", async () => {
    const { fetchFn } = mockFetch({
      status: 400,
      body: { message: "Invalid filter" },
    });
    const client = new TeamleaderClient({ accessToken: "tok", fetch: fetchFn });

    await expect(client.contacts.list()).rejects.toThrow(TeamleaderValidationError);
  });

  it("throws TeamleaderValidationError on 422", async () => {
    const { fetchFn } = mockFetch({
      status: 422,
      body: { message: "Missing required field" },
    });
    const client = new TeamleaderClient({ accessToken: "tok", fetch: fetchFn });

    await expect(client.contacts.list()).rejects.toThrow(TeamleaderValidationError);
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
    const client = new TeamleaderClient({
      accessToken: "tok",
      fetch: fetchFn,
      maxRetries: 3,
    });

    const result = await client.contacts.list();
    expect(calls).toHaveLength(2);
    expect(result).toEqual({ data: [{ id: "1" }] });
  });

  it("throws TeamleaderRateLimitError after max retries", async () => {
    const resetDate = new Date(Date.now() - 1000);
    const { fetchFn } = mockFetch({
      status: 429,
      body: { error: "rate_limit" },
      headers: {
        "content-type": "application/json",
        "X-RateLimit-Reset": resetDate.toISOString(),
      },
    });
    const client = new TeamleaderClient({
      accessToken: "tok",
      fetch: fetchFn,
      maxRetries: 0,  // no retries
    });

    await expect(client.contacts.list()).rejects.toThrow(TeamleaderRateLimitError);
  });

  it("uses custom baseUrl", async () => {
    const { fetchFn, calls } = mockFetch({ body: { data: [] } });
    const client = new TeamleaderClient({
      accessToken: "tok",
      fetch: fetchFn,
      baseUrl: "https://custom.api.example.com",
    });

    await client.contacts.list();
    expect(calls[0].url).toBe("https://custom.api.example.com/contacts.list");
  });

  it("sends X-API-Version header when apiVersion is set", async () => {
    const { fetchFn, calls } = mockFetch({ body: { data: [] } });
    const client = new TeamleaderClient({
      accessToken: "tok",
      fetch: fetchFn,
      apiVersion: "2023-09-26",
    });

    await client.contacts.list();

    expect(calls[0].init.headers).toEqual({
      "Content-Type": "application/json",
      Authorization: "Bearer tok",
      "X-API-Version": "2023-09-26",
    });
  });

  it("does not send X-API-Version header when apiVersion is not set", async () => {
    const { fetchFn, calls } = mockFetch({ body: { data: [] } });
    const client = new TeamleaderClient({ accessToken: "tok", fetch: fetchFn });

    await client.contacts.list();

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
    const client = new TeamleaderClient({
      accessToken: "old-token",
      refreshToken: "old-refresh",
      clientId: "client-id",
      clientSecret: "client-secret",
      onTokenRefresh: (tokens) => { refreshedTokens = tokens; },
      fetch: fetchFn,
    });

    const result = await client.contacts.list();

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

    const client = new TeamleaderClient({
      accessToken: "tok",
      refreshToken: "ref",
      clientId: "cid",
      clientSecret: "csec",
      fetch: fetchFn,
    });

    await expect(client.contacts.list()).rejects.toThrow(TeamleaderAuthenticationError);
    expect(calls).toHaveLength(3); // original + refresh + retry (no more)
  });

  it("handles network errors gracefully", async () => {
    const fetchFn = async () => {
      throw new TypeError("Failed to fetch");
    };
    const client = new TeamleaderClient({
      accessToken: "tok",
      fetch: fetchFn as typeof globalThis.fetch,
    });

    await expect(client.contacts.list()).rejects.toThrow(TeamleaderNetworkError);
  });

  it("retries on 500/502/503 server errors and succeeds", async () => {
    const { fetchFn, calls } = mockFetchSequence([
      { status: 503, body: { error: "service_unavailable" } },
      { status: 200, body: { data: [{ id: "1" }] } },
    ]);
    const client = new TeamleaderClient({
      accessToken: "tok",
      fetch: fetchFn,
      maxRetries: 3,
    });

    const result = await client.contacts.list();
    expect(calls).toHaveLength(2);
    expect(result).toEqual({ data: [{ id: "1" }] });
  });

  it("throws after max retries on persistent server errors", async () => {
    const { fetchFn } = mockFetch({
      status: 500,
      body: { error: "internal_server_error" },
    });
    const client = new TeamleaderClient({
      accessToken: "tok",
      fetch: fetchFn,
      maxRetries: 0,
    });

    await expect(client.contacts.list()).rejects.toThrow(TeamleaderError);
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

    const client = new TeamleaderClient({
      accessToken: "old-at",
      refreshToken: "old-rt",
      clientId: "cid",
      clientSecret: "csec",
      fetch: fetchFn,
    });

    await client.contacts.list();
    const result = await client.contacts.list();
    expect(result).toEqual({ data: [{ id: "2" }] });

    // The second refresh call (calls[4]) should use the new refresh token
    const secondRefreshBody = new URLSearchParams(calls[4].init.body as string);
    expect(secondRefreshBody.get("refresh_token")).toBe("new-rt");
  });
});
