import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class ProductCategoriesResource extends BaseResource {
    list(params?: RequestBody<"productCategories.list">): Promise<{
        data?: {
            id?: string;
            name?: string;
            ledgers?: {
                department?: {
                    id?: string;
                    type?: string;
                };
                ledger_account_number?: string;
            }[];
        }[];
    }>;
}
//# sourceMappingURL=product-categories.d.ts.map