import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class BusinessTypesResource extends BaseResource {
    list(params: RequestBody<"businessTypes.list">): Promise<{
        data?: {
            id?: string | undefined;
            name?: string | undefined;
            country?: string | undefined;
        }[] | undefined;
    }>;
}
//# sourceMappingURL=business-types.d.ts.map