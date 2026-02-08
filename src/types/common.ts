import type { operations } from "./generated.js";

// ---------------------------------------------------------------------------
// Helper types to extract request/response from generated operations
// ---------------------------------------------------------------------------

// Helper: recursively flatten intersection types into plain objects.
// This strips out `& Record<string, never>` and `& unknown` artifacts
// produced by openapi-typescript when processing allOf schemas.
//
// Without this, types like `{ value: number } & Record<string, never>`
// become impossible to satisfy because no string key can hold a value.
// We filter out index signatures with `never` values, then recurse
// into nested objects and arrays.
type KnownKeys<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
};
type Simplify<T> =
  T extends (infer U)[]
    ? Simplify<U>[]
    : T extends Record<string, unknown>
      ? { [K in keyof KnownKeys<T>]: Simplify<KnownKeys<T>[K]> }
      : T;

// Helper: extract JSON body from a content map, supporting both
// "application/json" and "application/json;charset=utf-8" keys.
type JsonContent<C> =
  C extends { "application/json": infer B }
    ? Simplify<B>
    : C extends { "application/json;charset=utf-8": infer B }
      ? Simplify<B>
      : never;

/** Extract the JSON request body type for a given operation.
 *  Handles both required and optional requestBody, and both
 *  "application/json" and "application/json;charset=utf-8" content types. */
export type RequestBody<Op extends keyof operations> =
  operations[Op] extends { requestBody: { content: infer C } }
    ? JsonContent<C>
    : operations[Op] extends { requestBody?: { content: infer C } }
      ? JsonContent<C>
      : never;

/** Extract the JSON response body type for a given operation (200 or 201).
 *  Handles both "application/json" and "application/json;charset=utf-8". */
export type ResponseBody<Op extends keyof operations> =
  operations[Op] extends { responses: { 200: { content: infer C } } }
    ? JsonContent<C>
    : operations[Op] extends { responses: { 201: { content: infer C } } }
      ? JsonContent<C>
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
