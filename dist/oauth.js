import { TeamleaderAuthenticationError } from "./errors.js";
const AUTHORIZATION_URL = "https://focus.teamleader.eu/oauth2/authorize";
const TOKEN_URL = "https://focus.teamleader.eu/oauth2/access_token";
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
export function createAuthorizationUrl(params) {
    const url = new URL(AUTHORIZATION_URL);
    url.searchParams.set("client_id", params.clientId);
    url.searchParams.set("redirect_uri", params.redirectUri);
    url.searchParams.set("response_type", "code");
    if (params.state) {
        url.searchParams.set("state", params.state);
    }
    return url.toString();
}
/**
 * Exchanges an authorization code for access and refresh tokens.
 */
export async function exchangeCodeForTokens(params) {
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
        let errorBody;
        try {
            errorBody = JSON.parse(text);
        }
        catch {
            errorBody = text;
        }
        throw new TeamleaderAuthenticationError(errorBody);
    }
    return (await response.json());
}
/**
 * Refreshes an expired access token using a refresh token.
 */
export async function refreshTokens(params) {
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
        let errorBody;
        try {
            errorBody = JSON.parse(text);
        }
        catch {
            errorBody = text;
        }
        throw new TeamleaderAuthenticationError(errorBody);
    }
    return (await response.json());
}
//# sourceMappingURL=oauth.js.map