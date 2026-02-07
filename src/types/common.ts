import type { operations } from "./generated.js";

// ---------------------------------------------------------------------------
// Helper types to extract request/response from generated operations
// ---------------------------------------------------------------------------

/** Extract the JSON request body type for a given operation */
export type RequestBody<Op extends keyof operations> =
  operations[Op] extends { requestBody: { content: { "application/json": infer B } } }
    ? B
    : never;

/** Extract the JSON response body type for a given operation (200 or 201) */
export type ResponseBody<Op extends keyof operations> =
  operations[Op] extends { responses: { 200: { content: { "application/json": infer R } } } }
    ? R
    : operations[Op] extends { responses: { 201: { content: { "application/json": infer R } } } }
      ? R
      : void;

// ---------------------------------------------------------------------------
// Common shared types
// ---------------------------------------------------------------------------

/** Pagination request parameters */
export interface Page {
  size?: number;
  number?: number;
}

/** Pagination metadata returned in list responses */
export interface PageMeta {
  page: {
    size: number;
    number: number;
  };
  matches: number;
}

/** Standard reference to another entity */
export interface TypeAndId {
  type: string;
  id: string;
}

/** A list response wraps data in an array with optional metadata */
export interface ListResponse<T> {
  data: T[];
  meta?: PageMeta;
}

/** A single-item response wraps data in an object */
export interface SingleResponse<T> {
  data: T;
}

/** A creation response typically returns type + id */
export interface CreatedResponse {
  data: TypeAndId;
}

// ---------------------------------------------------------------------------
// OAuth2 types
// ---------------------------------------------------------------------------

export interface OAuthTokens {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}
