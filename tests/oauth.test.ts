import { describe, it, expect } from "vitest";
import {
  createAuthorizationUrl,
  exchangeCodeForTokens,
  refreshTokens,
} from "../src/oauth.js";
import { TeamleaderFocusAuthenticationError } from "../src/errors.js";
import { mockFetch } from "./helpers.js";

describe("OAuth2", () => {
  describe("createAuthorizationUrl", () => {
    it("builds correct URL with required params", () => {
      const url = createAuthorizationUrl({
        clientId: "my-client-id",
        redirectUri: "https://myapp.com/callback",
      });

      const parsed = new URL(url);
      expect(parsed.origin).toBe("https://focus.teamleader.eu");
      expect(parsed.pathname).toBe("/oauth2/authorize");
      expect(parsed.searchParams.get("client_id")).toBe("my-client-id");
      expect(parsed.searchParams.get("redirect_uri")).toBe("https://myapp.com/callback");
      expect(parsed.searchParams.get("response_type")).toBe("code");
    });

    it("includes state parameter when provided", () => {
      const url = createAuthorizationUrl({
        clientId: "cid",
        redirectUri: "https://example.com/cb",
        state: "csrf-token-123",
      });

      const parsed = new URL(url);
      expect(parsed.searchParams.get("state")).toBe("csrf-token-123");
    });

    it("omits state when not provided", () => {
      const url = createAuthorizationUrl({
        clientId: "cid",
        redirectUri: "https://example.com/cb",
      });

      const parsed = new URL(url);
      expect(parsed.searchParams.has("state")).toBe(false);
    });
  });

  describe("exchangeCodeForTokens", () => {
    it("sends correct POST to token endpoint", async () => {
      const tokenResponse = {
        access_token: "access-123",
        refresh_token: "refresh-456",
        token_type: "Bearer",
        expires_in: 3600,
      };
      const { fetchFn, calls } = mockFetch({ body: tokenResponse });

      const tokens = await exchangeCodeForTokens({
        code: "auth-code",
        clientId: "cid",
        clientSecret: "csec",
        redirectUri: "https://example.com/cb",
        fetch: fetchFn,
      });

      expect(calls).toHaveLength(1);
      expect(calls[0].url).toBe("https://focus.teamleader.eu/oauth2/access_token");
      expect(calls[0].init.method).toBe("POST");

      const body = calls[0].init.body as string;
      const params = new URLSearchParams(body);
      expect(params.get("grant_type")).toBe("authorization_code");
      expect(params.get("code")).toBe("auth-code");
      expect(params.get("client_id")).toBe("cid");
      expect(params.get("client_secret")).toBe("csec");
      expect(params.get("redirect_uri")).toBe("https://example.com/cb");

      expect(tokens).toEqual(tokenResponse);
    });

    it("throws on error response", async () => {
      const { fetchFn } = mockFetch({
        status: 400,
        body: { error: "invalid_grant" },
      });

      await expect(
        exchangeCodeForTokens({
          code: "bad-code",
          clientId: "cid",
          clientSecret: "csec",
          redirectUri: "https://example.com/cb",
          fetch: fetchFn,
        }),
      ).rejects.toThrow(TeamleaderFocusAuthenticationError);
    });
  });

  describe("refreshTokens", () => {
    it("sends correct refresh request", async () => {
      const tokenResponse = {
        access_token: "new-access",
        refresh_token: "new-refresh",
        token_type: "Bearer",
        expires_in: 3600,
      };
      const { fetchFn, calls } = mockFetch({ body: tokenResponse });

      const tokens = await refreshTokens({
        refreshToken: "old-refresh",
        clientId: "cid",
        clientSecret: "csec",
        fetch: fetchFn,
      });

      expect(calls).toHaveLength(1);
      const body = calls[0].init.body as string;
      const params = new URLSearchParams(body);
      expect(params.get("grant_type")).toBe("refresh_token");
      expect(params.get("refresh_token")).toBe("old-refresh");

      expect(tokens).toEqual(tokenResponse);
    });

    it("throws on error response", async () => {
      const { fetchFn } = mockFetch({
        status: 400,
        body: { error: "invalid_grant" },
      });

      await expect(
        refreshTokens({
          refreshToken: "bad-token",
          clientId: "cid",
          clientSecret: "csec",
          fetch: fetchFn,
        }),
      ).rejects.toThrow(TeamleaderFocusAuthenticationError);
    });
  });
});
