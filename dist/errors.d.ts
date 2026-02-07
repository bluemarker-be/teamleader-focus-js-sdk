/** Base error for all Teamleader API errors */
export declare class TeamleaderError extends Error {
    readonly status: number;
    readonly body: unknown;
    constructor(message: string, status: number, body: unknown);
}
/** Thrown when the API returns 401 (invalid/expired token) */
export declare class TeamleaderAuthenticationError extends TeamleaderError {
    constructor(body: unknown);
}
/** Thrown when the API returns 429 (rate limit exceeded) */
export declare class TeamleaderRateLimitError extends TeamleaderError {
    readonly retryAfter: Date;
    constructor(retryAfter: Date, body: unknown);
}
/** Thrown when the API returns 400 or 422 (validation error) */
export declare class TeamleaderValidationError extends TeamleaderError {
    constructor(status: number, body: unknown);
}
/** Thrown when a network error occurs (timeout, DNS failure, etc.) */
export declare class TeamleaderNetworkError extends TeamleaderError {
    constructor(cause: Error);
}
//# sourceMappingURL=errors.d.ts.map