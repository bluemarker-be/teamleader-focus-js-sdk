import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class ActivityTypesResource extends BaseResource {
    list(params?: RequestBody<"activityTypes.list">): Promise<{
        data?: {
            id?: string;
            name?: string;
        }[];
    }>;
}
//# sourceMappingURL=activity-types.d.ts.map