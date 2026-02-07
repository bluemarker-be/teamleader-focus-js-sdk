import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class BusinessTypesResource extends BaseResource {
    list(params?: RequestBody<"businessTypes.list">): Promise<{
        data?: {
            id?: string;
            name?: string;
            country?: string;
        }[];
    }>;
}
//# sourceMappingURL=business-types.d.ts.map