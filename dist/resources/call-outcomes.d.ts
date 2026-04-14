import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class CallOutcomesResource extends BaseResource {
    /** Iterate all callOutcomes — auto-paginates across every page. */
    list(params?: RequestBody<"callOutcomes.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        name?: string | undefined;
    }, void, undefined>;
}
//# sourceMappingURL=call-outcomes.d.ts.map