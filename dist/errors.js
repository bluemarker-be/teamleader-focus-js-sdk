function isErrorBody(value) {
    return (typeof value === "object" &&
        value !== null &&
        Array.isArray(value.errors));
}
/** Base error for all Teamleader API errors */
export class TeamleaderFocusError extends Error {
    status;
    body;
    constructor(message, status, body) {
        super(message);
        this.name = "TeamleaderFocusError";
        this.status = status;
        this.body = body;
    }
    /**
     * Parsed errors array from Teamleader's standard error response.
     * Returns `undefined` when `body` isn't the expected `{ errors: [...] }`
     * shape (e.g. network errors, plain-text error bodies).
     */
    get errors() {
        return isErrorBody(this.body) ? this.body.errors : undefined;
    }
    /** Convenience: the first error's `title`, if present. */
    get title() {
        return this.errors?.[0]?.title;
    }
    /**
     * Convenience: the first error's `meta.field`, if present.
     * Useful for validation errors that pinpoint the offending field.
     */
    get field() {
        return this.errors?.[0]?.meta?.field;
    }
}
/** Thrown when the API returns 401 (invalid/expired token) */
export class TeamleaderFocusAuthenticationError extends TeamleaderFocusError {
    constructor(body) {
        super("Authentication failed — invalid or expired access token", 401, body);
        this.name = "TeamleaderFocusAuthenticationError";
    }
}
/** Thrown when a token refresh fails (e.g. refresh token revoked or not linked to client) */
export class TeamleaderFocusTokenRefreshError extends TeamleaderFocusAuthenticationError {
    constructor(body) {
        super(body);
        this.name = "TeamleaderFocusTokenRefreshError";
        const hint = this.errors?.[0]?.meta?.hint;
        this.message = hint ? `Token refresh failed: ${hint}` : "Token refresh failed";
    }
}
/** Thrown when the API returns 429 (rate limit exceeded) */
export class TeamleaderFocusRateLimitError extends TeamleaderFocusError {
    retryAfter;
    constructor(retryAfter, body) {
        super(`Rate limit exceeded — retry after ${retryAfter.toISOString()}`, 429, body);
        this.name = "TeamleaderFocusRateLimitError";
        this.retryAfter = retryAfter;
    }
}
/** Thrown when the API returns 400 or 422 (validation error) */
export class TeamleaderFocusValidationError extends TeamleaderFocusError {
    constructor(status, body) {
        // Prefer the first error's title — that's the actual API message.
        // Falls back to "Validation error" when the body isn't the expected shape.
        const titleFromBody = isErrorBody(body) ? body.errors[0]?.title : undefined;
        super(titleFromBody ?? "Validation error", status, body);
        this.name = "TeamleaderFocusValidationError";
    }
}
/** Thrown when a network error occurs (timeout, DNS failure, etc.) */
export class TeamleaderFocusNetworkError extends TeamleaderFocusError {
    constructor(cause) {
        super(`Network error: ${cause.message}`, 0, null);
        this.name = "TeamleaderFocusNetworkError";
        this.cause = cause;
    }
}
//# sourceMappingURL=errors.js.map