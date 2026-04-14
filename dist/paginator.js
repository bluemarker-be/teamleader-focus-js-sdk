const DEFAULT_PAGE_SIZE = 100;
const MAX_PAGE_SIZE = 100;
/** No cap by default — the iterator stops naturally when the API returns an
 *  empty / short page. Users who want an explicit safety bound pass `maxPages`. */
const DEFAULT_MAX_PAGES = Infinity;
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
export async function* paginatePages(client, endpoint, params = {}, options = {}) {
    const maxPages = options.maxPages ?? DEFAULT_MAX_PAGES;
    const pageSize = Math.min(params.page?.size ?? DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE);
    let pageNumber = params.page?.number ?? 1;
    let pagesYielded = 0;
    while (pagesYielded < maxPages) {
        if (options.signal?.aborted) {
            throw options.signal.reason instanceof Error
                ? options.signal.reason
                : new DOMException("The operation was aborted.", "AbortError");
        }
        const response = await client.request(endpoint, { ...params, page: { size: pageSize, number: pageNumber } }, { signal: options.signal });
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
export async function* paginateItems(client, endpoint, params = {}, options = {}) {
    for await (const page of paginatePages(client, endpoint, params, options)) {
        for (const item of page.data) {
            yield item;
        }
    }
}
//# sourceMappingURL=paginator.js.map