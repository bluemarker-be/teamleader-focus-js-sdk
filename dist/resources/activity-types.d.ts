import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class ActivityTypesResource extends BaseResource {
    /** Iterate all activityTypes — auto-paginates across every page. */
    list(params?: RequestBody<"activityTypes.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        name?: string | undefined;
    }, void, undefined>;
}
//# sourceMappingURL=activity-types.d.ts.map