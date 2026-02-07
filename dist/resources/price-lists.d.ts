import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class PriceListsResource extends BaseResource {
    list(params?: RequestBody<"priceLists.list">): Promise<{
        data?: {
            id?: string;
            name?: string;
            calculation_method?: "manual" | "based_on_price_list" | "based_on_purchase_price";
        }[];
    }>;
}
//# sourceMappingURL=price-lists.d.ts.map