import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class TagsResource extends BaseResource {
    /** Iterate all tags — auto-paginates across every page. */
    list(params?: RequestBody<"tags.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        tag?: string | undefined;
    }, void, undefined>;
}
//# sourceMappingURL=tags.d.ts.map