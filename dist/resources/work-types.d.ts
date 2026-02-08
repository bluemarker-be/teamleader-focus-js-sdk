import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class WorkTypesResource extends BaseResource {
    list(params?: RequestBody<"workTypes.list">): Promise<{
        data?: {
            id?: string | undefined;
            name?: string | undefined;
        }[] | undefined;
    }>;
}
//# sourceMappingURL=work-types.d.ts.map