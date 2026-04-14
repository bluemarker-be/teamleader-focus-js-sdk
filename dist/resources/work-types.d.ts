import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class WorkTypesResource extends BaseResource {
    /** Iterate all workTypes — auto-paginates across every page. */
    list(params?: RequestBody<"workTypes.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        name?: string | undefined;
    }, void, undefined>;
}
//# sourceMappingURL=work-types.d.ts.map