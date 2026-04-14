import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class LevelTwoAreasResource extends BaseResource {
    /** Iterate all levelTwoAreas — auto-paginates across every page. */
    list(params: RequestBody<"levelTwoAreas.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        name?: string | undefined;
        country?: string | undefined;
    }, void, undefined>;
}
//# sourceMappingURL=level-two-areas.d.ts.map