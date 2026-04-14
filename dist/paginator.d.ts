import type { TeamleaderClient } from "./client.js";
export interface PaginatedRequest {
    page?: {
        size?: number;
        number?: number;
    };
    [key: string]: unknown;
}
export interface PaginatedResponse<T> {
    data: T[];
    meta?: {
        page: {
            size: number;
            number: number;
        };
        matches: number;
    };
}
/**
 * Async iterator that yields pages of results from a paginated endpoint.
 *
 * @example
 * ```ts
 * for await (const page of paginatePages(client, "/contacts.list", { filter: { term: "John" } })) {
 *   console.log(page.data);
 * }
 * ```
 */
export declare function paginatePages<T>(client: TeamleaderClient, endpoint: string, params?: PaginatedRequest, options?: {
    maxPages?: number;
}): AsyncGenerator<PaginatedResponse<T>, void, undefined>;
/**
 * Async iterator that yields individual items from a paginated endpoint.
 *
 * @example
 * ```ts
 * for await (const contact of paginateItems(client, "/contacts.list", { filter: { term: "John" } })) {
 *   console.log(contact.first_name);
 * }
 * ```
 */
export declare function paginateItems<T>(client: TeamleaderClient, endpoint: string, params?: PaginatedRequest, options?: {
    maxPages?: number;
}): AsyncGenerator<T, void, undefined>;
//# sourceMappingURL=paginator.d.ts.map