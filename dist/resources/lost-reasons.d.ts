import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class LostReasonsResource extends BaseResource {
    list(params?: RequestBody<"lostReasons.list">): Promise<{
        data?: {
            id?: string;
            name?: string;
        }[];
    }>;
}
//# sourceMappingURL=lost-reasons.d.ts.map