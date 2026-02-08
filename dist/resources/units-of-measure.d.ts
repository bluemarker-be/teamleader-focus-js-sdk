import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class UnitsOfMeasureResource extends BaseResource {
    /** Get a list of units of measure */
    list(params?: RequestBody<"unitsOfMeasure.list">): Promise<{
        data?: {
            id?: string | undefined;
            name?: string | undefined;
        }[] | undefined;
    }>;
}
//# sourceMappingURL=units-of-measure.d.ts.map