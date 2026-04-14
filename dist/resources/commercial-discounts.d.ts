import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class CommercialDiscountsResource extends BaseResource {
    /** Iterate all commercialDiscounts — auto-paginates across every page. */
    list(params?: RequestBody<"commercialDiscounts.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        name?: string | undefined;
        department?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }, void, undefined>;
}
//# sourceMappingURL=commercial-discounts.d.ts.map