import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class BusinessTypesResource extends BaseResource {
    /** Iterate all businessTypes — auto-paginates across every page. */
    list(params: RequestBody<"businessTypes.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        name?: string | undefined;
        country?: string | undefined;
    }, void, undefined>;
}
//# sourceMappingURL=business-types.d.ts.map