import type { operations } from "./generated.js";
type KnownKeys<T> = {
    [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
};
type Simplify<T> = T extends (infer U)[] ? Simplify<U>[] : T extends Record<string, unknown> ? {
    [K in keyof KnownKeys<T>]: Simplify<KnownKeys<T>[K]>;
} : T;
type JsonContent<C> = C extends {
    "application/json": infer B;
} ? Simplify<B> : C extends {
    "application/json;charset=utf-8": infer B;
} ? Simplify<B> : never;
/** Extract the JSON request body type for a given operation.
 *  Handles both required and optional requestBody, and both
 *  "application/json" and "application/json;charset=utf-8" content types. */
export type RequestBody<Op extends keyof operations> = operations[Op] extends {
    requestBody: {
        content: infer C;
    };
} ? JsonContent<C> : operations[Op] extends {
    requestBody?: {
        content: infer C;
    };
} ? JsonContent<C> : never;
/** Extract the JSON response body type for a given operation (200 or 201).
 *  Handles both "application/json" and "application/json;charset=utf-8". */
export type ResponseBody<Op extends keyof operations> = operations[Op] extends {
    responses: {
        200: {
            content: infer C;
        };
    };
} ? JsonContent<C> : operations[Op] extends {
    responses: {
        201: {
            content: infer C;
        };
    };
} ? JsonContent<C> : void;
/** Extract the item type from a list-style response, i.e. `ResponseBody<Op>["data"][number]`.
 *  Used by resource `list()` methods to type each yielded item in the async iterator. */
export type ListItem<Op extends keyof operations> = ResponseBody<Op> extends {
    data?: (infer U)[] | null | undefined;
} ? U : ResponseBody<Op> extends {
    data: (infer U)[];
} ? U : never;
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
export {};
//# sourceMappingURL=common.d.ts.map