import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class DealSourcesResource extends BaseResource {
    /** Iterate all dealSources — auto-paginates across every page. */
    list(params?: RequestBody<"dealSources.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        name?: string | undefined;
    }, void, undefined>;
}
//# sourceMappingURL=deal-sources.d.ts.map