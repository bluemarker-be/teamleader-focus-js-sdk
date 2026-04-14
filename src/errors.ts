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

function isErrorBody(value: unknown): value is TeamleaderApiErrorBody {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as { errors?: unknown }).errors)
  );
}

/** Base error for all Teamleader API errors */
export class TeamleaderFocusError extends Error {
  public readonly status: number;
  public readonly body: unknown;

  constructor(message: string, status: number, body: unknown) {
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
  get errors(): TeamleaderApiError[] | undefined {
    return isErrorBody(this.body) ? this.body.errors : undefined;
  }

  /** Convenience: the first error's `title`, if present. */
  get title(): string | undefined {
    return this.errors?.[0]?.title;
  }

  /**
   * Convenience: the first error's `meta.field`, if present.
   * Useful for validation errors that pinpoint the offending field.
   */
  get field(): string | undefined {
    return this.errors?.[0]?.meta?.field;
  }
}

/** Thrown when the API returns 401 (invalid/expired token) */
export class TeamleaderFocusAuthenticationError extends TeamleaderFocusError {
  constructor(body: unknown) {
    super("Authentication failed — invalid or expired access token", 401, body);
    this.name = "TeamleaderFocusAuthenticationError";
  }
}

/** Thrown when a token refresh fails (e.g. refresh token revoked or not linked to client) */
export class TeamleaderFocusTokenRefreshError extends TeamleaderFocusAuthenticationError {
  constructor(body: unknown) {
    super(body);
    this.name = "TeamleaderFocusTokenRefreshError";
    const hint = this.errors?.[0]?.meta?.hint;
    this.message = hint ? `Token refresh failed: ${hint}` : "Token refresh failed";
  }
}

/** Thrown when the API returns 429 (rate limit exceeded) */
export class TeamleaderFocusRateLimitError extends TeamleaderFocusError {
  public readonly retryAfter: Date;

  constructor(retryAfter: Date, body: unknown) {
    super(
      `Rate limit exceeded — retry after ${retryAfter.toISOString()}`,
      429,
      body,
    );
    this.name = "TeamleaderFocusRateLimitError";
    this.retryAfter = retryAfter;
  }
}

/** Thrown when the API returns 400 or 422 (validation error) */
export class TeamleaderFocusValidationError extends TeamleaderFocusError {
  constructor(status: number, body: unknown) {
    // Prefer the first error's title — that's the actual API message.
    // Falls back to "Validation error" when the body isn't the expected shape.
    const titleFromBody = isErrorBody(body) ? body.errors[0]?.title : undefined;
    super(titleFromBody ?? "Validation error", status, body);
    this.name = "TeamleaderFocusValidationError";
  }
}

/** Thrown when a network error occurs (timeout, DNS failure, etc.) */
export class TeamleaderFocusNetworkError extends TeamleaderFocusError {
  constructor(cause: Error) {
    super(`Network error: ${cause.message}`, 0, null);
    this.name = "TeamleaderFocusNetworkError";
    this.cause = cause;
  }
}
