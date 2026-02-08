import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class DayOffTypesResource extends BaseResource {
    list(): Promise<{
        data?: {
            id?: string | undefined;
            name?: string | undefined;
        }[] | undefined;
    }>;
    create(params: RequestBody<"dayOffTypes.create">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    update(params: RequestBody<"dayOffTypes.update">): Promise<void>;
    delete(params: RequestBody<"dayOffTypes.delete">): Promise<void>;
}
//# sourceMappingURL=day-off-types.d.ts.map