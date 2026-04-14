import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class UnitsOfMeasureResource extends BaseResource {
    /** Iterate all unitsOfMeasure — auto-paginates across every page. */
    list(params?: RequestBody<"unitsOfMeasure.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        name?: string | undefined;
    }, void, undefined>;
}
//# sourceMappingURL=units-of-measure.d.ts.map