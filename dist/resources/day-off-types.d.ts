import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class DayOffTypesResource extends BaseResource {
    list(): Promise<{
        data?: {
            id?: string;
            name?: string;
        }[];
    }>;
    create(params: RequestBody<"dayOffTypes.create">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
    update(params: RequestBody<"dayOffTypes.update">): Promise<void>;
    delete(params: RequestBody<"dayOffTypes.delete">): Promise<void>;
}
//# sourceMappingURL=day-off-types.d.ts.map