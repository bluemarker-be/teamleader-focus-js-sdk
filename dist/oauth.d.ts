import type { OAuthTokens } from "./types/common.js";
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
export declare function createAuthorizationUrl(params: AuthorizationUrlParams): string;
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
export declare function exchangeCodeForTokens(params: ExchangeCodeParams): Promise<OAuthTokens>;
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
export declare function refreshTokens(params: RefreshTokenParams): Promise<OAuthTokens>;
//# sourceMappingURL=oauth.d.ts.map