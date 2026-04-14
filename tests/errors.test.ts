import { describe, it, expect } from "vitest";
import {
  TeamleaderFocusError,
  TeamleaderFocusAuthenticationError,
  TeamleaderFocusTokenRefreshError,
  TeamleaderFocusRateLimitError,
  TeamleaderFocusValidationError,
  TeamleaderFocusNetworkError,
} from "../src/errors.js";

describe("error body accessors", () => {
  const validationBody = {
    errors: [
      {
        code: 0,
        title: "id invalid uuid",
        status: 400,
        meta: { field: "id" },
      },
    ],
  };

  it("exposes typed errors[] via accessor", () => {
    const err = new TeamleaderFocusError("x", 400, validationBody);
    expect(err.errors).toEqual(validationBody.errors);
    expect(err.errors?.[0]?.title).toBe("id invalid uuid");
  });

  it("exposes first error's title via .title", () => {
    const err = new TeamleaderFocusError("x", 400, validationBody);
    expect(err.title).toBe("id invalid uuid");
  });

  it("exposes first error's meta.field via .field", () => {
    const err = new TeamleaderFocusError("x", 400, validationBody);
    expect(err.field).toBe("id");
  });

  it("returns undefined for .errors when body is not the expected shape", () => {
    expect(new TeamleaderFocusError("x", 500, null).errors).toBeUndefined();
    expect(new TeamleaderFocusError("x", 500, "plain text").errors).toBeUndefined();
    expect(new TeamleaderFocusError("x", 500, { some: "other" }).errors).toBeUndefined();
  });

  it("returns undefined for .title and .field when body has no errors", () => {
    const err = new TeamleaderFocusError("x", 500, null);
    expect(err.title).toBeUndefined();
    expect(err.field).toBeUndefined();
  });

  it("handles error entries without meta.field", () => {
    const err = new TeamleaderFocusError("x", 401, {
      errors: [{ status: 401, title: "Unauthorized" }],
    });
    expect(err.title).toBe("Unauthorized");
    expect(err.field).toBeUndefined();
  });

  it("surfaces all errors in a multi-error response", () => {
    const body = {
      errors: [
        { code: 0, title: "oneOf rule failed", status: 400, meta: { field: "oneOf" } },
        { code: 0, title: "event_id must be present", status: 400, meta: { field: "event_id" } },
        { code: 0, title: "id invalid uuid", status: 400, meta: { field: "id" } },
      ],
    };
    const err = new TeamleaderFocusError("x", 400, body);
    expect(err.errors).toHaveLength(3);
    // Convenience accessors return the FIRST
    expect(err.title).toBe("oneOf rule failed");
    expect(err.field).toBe("oneOf");
  });
});

describe("TeamleaderFocusValidationError", () => {
  it("uses the first error's title as .message when body is an error response", () => {
    const err = new TeamleaderFocusValidationError(400, {
      errors: [{ status: 400, title: "project_id must be valid", meta: { field: "project_id" } }],
    });
    expect(err.message).toBe("project_id must be valid");
  });

  it("falls back to 'Validation error' when body has no errors array", () => {
    const err = new TeamleaderFocusValidationError(400, null);
    expect(err.message).toBe("Validation error");
  });

  it("still preserves the body for inspection", () => {
    const body = { errors: [{ status: 422, title: "bad", meta: { field: "x" } }] };
    const err = new TeamleaderFocusValidationError(422, body);
    expect(err.body).toBe(body);
    expect(err.field).toBe("x");
  });
});

describe("TeamleaderFocusTokenRefreshError", () => {
  it("picks up meta.hint in the message", () => {
    const err = new TeamleaderFocusTokenRefreshError({
      errors: [{ status: 400, title: "invalid_grant", meta: { hint: "Token has been revoked" } }],
    });
    expect(err.message).toBe("Token refresh failed: Token has been revoked");
    expect(err.name).toBe("TeamleaderFocusTokenRefreshError");
    // Inherits from AuthenticationError
    expect(err).toBeInstanceOf(TeamleaderFocusAuthenticationError);
  });

  it("falls back to generic message when hint is absent", () => {
    const err = new TeamleaderFocusTokenRefreshError(null);
    expect(err.message).toBe("Token refresh failed");
  });
});

describe("TeamleaderFocusRateLimitError", () => {
  it("carries retryAfter as a Date and exposes error accessors", () => {
    const when = new Date("2026-04-14T12:00:00Z");
    const err = new TeamleaderFocusRateLimitError(when, {
      errors: [{ status: 429, title: "Rate limit exceeded" }],
    });
    expect(err.retryAfter).toBe(when);
    expect(err.title).toBe("Rate limit exceeded");
  });
});

describe("TeamleaderFocusNetworkError", () => {
  it("wraps the cause and has no structured body", () => {
    const cause = new Error("getaddrinfo ENOTFOUND");
    const err = new TeamleaderFocusNetworkError(cause);
    expect(err.message).toBe("Network error: getaddrinfo ENOTFOUND");
    expect(err.cause).toBe(cause);
    expect(err.status).toBe(0);
    expect(err.body).toBeNull();
    expect(err.errors).toBeUndefined();
  });
});
