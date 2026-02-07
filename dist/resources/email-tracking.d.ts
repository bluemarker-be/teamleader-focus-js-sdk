import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class EmailTrackingResource extends BaseResource {
    list(params: RequestBody<"emailTracking.list">): Promise<void>;
    create(params: RequestBody<"emailTracking.create">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
}
//# sourceMappingURL=email-tracking.d.ts.map