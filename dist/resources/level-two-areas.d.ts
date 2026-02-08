import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class LevelTwoAreasResource extends BaseResource {
    /** Get a list of level two areas */
    list(params?: RequestBody<"levelTwoAreas.list">): Promise<{
        data?: {
            id?: string | undefined;
            name?: string | undefined;
            country?: string | undefined;
        }[] | undefined;
    }>;
}
//# sourceMappingURL=level-two-areas.d.ts.map