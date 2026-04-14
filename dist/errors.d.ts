/** Base error for all Teamleader API errors */
export declare class TeamleaderFocusError extends Error {
    readonly status: number;
    readonly body: unknown;
    constructor(message: string, status: number, body: unknown);
}
/** Thrown when the API returns 401 (invalid/expired token) */
export declare class TeamleaderFocusAuthenticationError extends TeamleaderFocusError {
    constructor(body: unknown);
}
/** Thrown when a token refresh fails (e.g. refresh token revoked or not linked to client) */
export declare class TeamleaderFocusTokenRefreshError extends TeamleaderFocusAuthenticationError {
    constructor(body: unknown);
}
/** Thrown when the API returns 429 (rate limit exceeded) */
export declare class TeamleaderFocusRateLimitError extends TeamleaderFocusError {
    readonly retryAfter: Date;
    constructor(retryAfter: Date, body: unknown);
}
/** Thrown when the API returns 400 or 422 (validation error) */
export declare class TeamleaderFocusValidationError extends TeamleaderFocusError {
    constructor(status: number, body: unknown);
}
/** Thrown when a network error occurs (timeout, DNS failure, etc.) */
export declare class TeamleaderFocusNetworkError extends TeamleaderFocusError {
    constructor(cause: Error);
}
//# sourceMappingURL=errors.d.ts.map