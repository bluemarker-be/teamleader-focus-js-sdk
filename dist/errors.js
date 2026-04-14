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
        const hint = extractHint(body);
        this.message = hint ? `Token refresh failed: ${hint}` : "Token refresh failed";
    }
}
function extractHint(body) {
    try {
        const errors = body?.errors;
        if (Array.isArray(errors) && errors.length > 0) {
            return errors[0].meta?.hint;
        }
    }
    catch {
        // ignore
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
        const msg = typeof body === "object" && body !== null && "message" in body
            ? String(body.message)
            : "Validation error";
        super(msg, status, body);
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