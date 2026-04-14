import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class PriceListsResource extends BaseResource {
    /** Iterate all priceLists — auto-paginates across every page. */
    list(params?: RequestBody<"priceLists.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        name?: string | undefined;
        calculation_method?: "manual" | "based_on_price_list" | "based_on_purchase_price" | undefined;
    }, void, undefined>;
}
//# sourceMappingURL=price-lists.d.ts.map