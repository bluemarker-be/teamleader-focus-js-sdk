import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class DaysOffResource extends BaseResource {
    /** Import days off in bulk */
    import(params: RequestBody<"daysOff.import">): Promise<void>;
    /** Delete days off in bulk */
    bulkDelete(params: RequestBody<"daysOff.bulkDelete">): Promise<void>;
}
//# sourceMappingURL=days-off.d.ts.map