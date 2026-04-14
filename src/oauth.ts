import { TeamleaderFocusAuthenticationError, TeamleaderFocusTokenRefreshError } from "./errors.js";
import type { OAuthTokens } from "./types/common.js";

const AUTHORIZATION_URL = "https://focus.teamleader.eu/oauth2/authorize";
const TOKEN_URL = "https://focus.teamleader.eu/oauth2/access_token";

// ---------------------------------------------------------------------------
// Step 1: Build the authorization URL for the OAuth2 flow
// ---------------------------------------------------------------------------

export interface AuthorizationUrlParams {
  clientId: string;
  redirectUri: string;
  /** Random string for CSRF protection — you must verify this on callback */
  state?: string;
}

/**
 * Creates the URL to redirect the user to for OAuth2 authorization.
 *
 * @example
 * ```ts
 * const url = createAuthorizationUrl({
 *   clientId: "your-client-id",
 *   redirectUri: "https://myapp.com/callback",
 *   state: "random-csrf-token",
 * });
 * // Redirect the user to `url`
 * ```
 */
export function createAuthorizationUrl(params: AuthorizationUrlParams): string {
  const url = new URL(AUTHORIZATION_URL);
  url.searchParams.set("client_id", params.clientId);
  url.searchParams.set("redirect_uri", params.redirectUri);
  url.searchParams.set("response_type", "code");
  if (params.state) {
    url.searchParams.set("state", params.state);
  }
  return url.toString();
}

// ---------------------------------------------------------------------------
// Step 2: Exchange authorization code for tokens
// ---------------------------------------------------------------------------

export interface ExchangeCodeParams {
  code: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  /** Optional custom fetch for cross-runtime support */
  fetch?: typeof globalThis.fetch;
}

/**
 * Exchanges an authorization code for access and refresh tokens.
 */
export async function exchangeCodeForTokens(
  params: ExchangeCodeParams,
): Promise<OAuthTokens> {
  const fetchFn = params.fetch ?? globalThis.fetch;

  const body = new URLSearchParams({
    client_id: params.clientId,
    client_secret: params.clientSecret,
    code: params.code,
    grant_type: "authorization_code",
    redirect_uri: params.redirectUri,
  });

  const response = await fetchFn(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    const text = await response.text();
    let errorBody: unknown;
    try {
      errorBody = JSON.parse(text);
    } catch {
      errorBody = text;
    }
    throw new TeamleaderFocusAuthenticationError(errorBody);
  }

  return (await response.json()) as OAuthTokens;
}

// ---------------------------------------------------------------------------
// Step 3: Refresh an access token
// Throws TeamleaderFocusTokenRefreshError on failure (subclass of TeamleaderFocusAuthenticationError)
// ---------------------------------------------------------------------------

export interface RefreshTokenParams {
  refreshToken: string;
  clientId: string;
  clientSecret: string;
  /** Optional custom fetch for cross-runtime support */
  fetch?: typeof globalThis.fetch;
}

/**
 * Refreshes an expired access token using a refresh token.
 */
export async function refreshTokens(
  params: RefreshTokenParams,
): Promise<OAuthTokens> {
  const fetchFn = params.fetch ?? globalThis.fetch;

  const body = new URLSearchParams({
    client_id: params.clientId,
    client_secret: params.clientSecret,
    refresh_token: params.refreshToken,
    grant_type: "refresh_token",
  });

  const response = await fetchFn(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    const text = await response.text();
    let errorBody: unknown;
    try {
      errorBody = JSON.parse(text);
    } catch {
      errorBody = text;
    }
    throw new TeamleaderFocusTokenRefreshError(errorBody);
  }

  return (await response.json()) as OAuthTokens;
}
