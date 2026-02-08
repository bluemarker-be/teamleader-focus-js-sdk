import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class CallOutcomesResource extends BaseResource {
    /** Get a list of call outcomes */
    list(params?: RequestBody<"callOutcomes.list">): Promise<{
        data?: {
            id?: string | undefined;
            name?: string | undefined;
        }[] | undefined;
    }>;
}
//# sourceMappingURL=call-outcomes.d.ts.map