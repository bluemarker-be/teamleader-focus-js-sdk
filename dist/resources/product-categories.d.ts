import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class ProductCategoriesResource extends BaseResource {
    /** Iterate all productCategories — auto-paginates across every page. */
    list(params?: RequestBody<"productCategories.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        name?: string | undefined;
        ledgers?: {
            department?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            ledger_account_number?: string | undefined;
        }[] | undefined;
    }, void, undefined>;
}
//# sourceMappingURL=product-categories.d.ts.map