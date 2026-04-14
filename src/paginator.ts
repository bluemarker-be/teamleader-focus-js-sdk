import type { TeamleaderFocusClient } from "./client.js";

export interface PaginatedRequest {
  page?: { size?: number; number?: number };
  [key: string]: unknown;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta?: {
    page: { size: number; number: number };
    matches: number;
  };
}

const DEFAULT_PAGE_SIZE = 100;
const MAX_PAGE_SIZE = 100;
const DEFAULT_MAX_PAGES = 100;

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
export async function* paginatePages<T>(
  client: TeamleaderFocusClient,
  endpoint: string,
  params: PaginatedRequest = {},
  options: { maxPages?: number } = {},
): AsyncGenerator<PaginatedResponse<T>, void, undefined> {
  const maxPages = options.maxPages ?? DEFAULT_MAX_PAGES;
  const pageSize = Math.min(params.page?.size ?? DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE);
  let pageNumber = params.page?.number ?? 1;
  let pagesYielded = 0;

  while (pagesYielded < maxPages) {
    const response = await client.request<PaginatedResponse<T>>(endpoint, {
      ...params,
      page: { size: pageSize, number: pageNumber },
    });

    // Stop before yielding if no data (avoids yielding an empty trailing page)
    if (!response.data || response.data.length === 0) {
      break;
    }

    yield response;
    pagesYielded++;

    // Stop if we've received all matches
    if (response.meta?.matches !== undefined) {
      const totalFetched = pagesYielded * pageSize;
      if (totalFetched >= response.meta.matches) {
        break;
      }
    }

    // Stop if we got fewer items than page size (last page)
    if (response.data.length < pageSize) {
      break;
    }

    pageNumber++;
  }
}

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
export async function* paginateItems<T>(
  client: TeamleaderFocusClient,
  endpoint: string,
  params: PaginatedRequest = {},
  options: { maxPages?: number } = {},
): AsyncGenerator<T, void, undefined> {
  for await (const page of paginatePages<T>(client, endpoint, params, options)) {
    for (const item of page.data) {
      yield item;
    }
  }
}
