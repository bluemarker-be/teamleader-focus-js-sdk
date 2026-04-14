/**
 * A single entry in Teamleader's standard `{ errors: [...] }` response.
 * Seen in practice across all error responses — shape is consistent enough
 * to type, with optional fields where Teamleader sometimes omits them.
 *
 * @example
 * ```json
 * {
 *   "code": 0,
 *   "title": "id invalid uuid",
 *   "status": 400,
 *   "meta": { "field": "id" }
 * }
 * ```
 */
export interface TeamleaderApiError {
    /** Numeric error code — usually 0, occasionally non-zero */
    code?: number;
    /** Human-readable error message */
    title: string;
    /** HTTP status code (matches the response status in most cases) */
    status: number;
    /** Optional metadata — most commonly `{ field }` for validation errors */
    meta?: {
        /** Field name that caused the error, when applicable */
        field?: string;
        /** OAuth refresh hints — e.g. "Token has been revoked" */
        hint?: string;
        /** Other keys Teamleader may add in the future */
        [key: string]: unknown;
    };
}
/** Shape of the JSON body Teamleader returns on error responses */
export interface TeamleaderApiErrorBody {
    errors: TeamleaderApiError[];
}
/** Base error for all Teamleader API errors */
export declare class TeamleaderFocusError extends Error {
    readonly status: number;
    readonly body: unknown;
    constructor(message: string, status: number, body: unknown);
    /**
     * Parsed errors array from Teamleader's standard error response.
     * Returns `undefined` when `body` isn't the expected `{ errors: [...] }`
     * shape (e.g. network errors, plain-text error bodies).
     */
    get errors(): TeamleaderApiError[] | undefined;
    /** Convenience: the first error's `title`, if present. */
    get title(): string | undefined;
    /**
     * Convenience: the first error's `meta.field`, if present.
     * Useful for validation errors that pinpoint the offending field.
     */
    get field(): string | undefined;
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