/** Base error for all Teamleader API errors */
export class TeamleaderError extends Error {
  public readonly status: number;
  public readonly body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "TeamleaderError";
    this.status = status;
    this.body = body;
  }
}

/** Thrown when the API returns 401 (invalid/expired token) */
export class TeamleaderAuthenticationError extends TeamleaderError {
  constructor(body: unknown) {
    super("Authentication failed — invalid or expired access token", 401, body);
    this.name = "TeamleaderAuthenticationError";
  }
}

/** Thrown when the API returns 429 (rate limit exceeded) */
export class TeamleaderRateLimitError extends TeamleaderError {
  public readonly retryAfter: Date;

  constructor(retryAfter: Date, body: unknown) {
    super(
      `Rate limit exceeded — retry after ${retryAfter.toISOString()}`,
      429,
      body,
    );
    this.name = "TeamleaderRateLimitError";
    this.retryAfter = retryAfter;
  }
}

/** Thrown when the API returns 400 or 422 (validation error) */
export class TeamleaderValidationError extends TeamleaderError {
  constructor(status: number, body: unknown) {
    const msg = typeof body === "object" && body !== null && "message" in body
      ? String((body as Record<string, unknown>).message)
      : "Validation error";
    super(msg, status, body);
    this.name = "TeamleaderValidationError";
  }
}

/** Thrown when a network error occurs (timeout, DNS failure, etc.) */
export class TeamleaderNetworkError extends TeamleaderError {
  constructor(cause: Error) {
    super(`Network error: ${cause.message}`, 0, null);
    this.name = "TeamleaderNetworkError";
    this.cause = cause;
  }
}
