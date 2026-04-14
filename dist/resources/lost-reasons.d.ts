import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class LostReasonsResource extends BaseResource {
    /** Iterate all lostReasons — auto-paginates across every page. */
    list(params?: RequestBody<"lostReasons.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        name?: string | undefined;
    }, void, undefined>;
}
//# sourceMappingURL=lost-reasons.d.ts.map