const DEFAULT_PAGE_SIZE = 20;
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
export async function* paginatePages(client, endpoint, params = {}, options = {}) {
    const maxPages = options.maxPages ?? DEFAULT_MAX_PAGES;
    const pageSize = params.page?.size ?? DEFAULT_PAGE_SIZE;
    let pageNumber = params.page?.number ?? 1;
    let pagesYielded = 0;
    while (pagesYielded < maxPages) {
        const response = await client.request(endpoint, {
            ...params,
            page: { size: pageSize, number: pageNumber },
        });
        yield response;
        pagesYielded++;
        // Stop if no data or less than a full page (= last page)
        if (!response.data || response.data.length === 0) {
            break;
        }
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