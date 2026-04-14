import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class DayOffTypesResource extends BaseResource {
    /** Iterate all dayOffTypes — auto-paginates across every page. */
    list(_params?: undefined, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        name?: string | undefined;
    }, void, undefined>;
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