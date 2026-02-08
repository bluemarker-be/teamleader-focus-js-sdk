import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class ProductCategoriesResource extends BaseResource {
    list(params?: RequestBody<"productCategories.list">): Promise<{
        data?: {
            id?: string | undefined;
            name?: string | undefined;
            ledgers?: {
                department?: {
                    id?: string | undefined;
                    type?: string | undefined;
                } | undefined;
                ledger_account_number?: string | undefined;
            }[] | undefined;
        }[] | undefined;
    }>;
}
//# sourceMappingURL=product-categories.d.ts.map