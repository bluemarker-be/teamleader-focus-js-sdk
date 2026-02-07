import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class DaysOffResource extends BaseResource {
    import(params: RequestBody<"daysOff.import">): Promise<void>;
    bulkDelete(params: RequestBody<"daysOff.bulkDelete">): Promise<void>;
}
//# sourceMappingURL=days-off.d.ts.map