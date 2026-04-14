import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class TaxRatesResource extends BaseResource {
    /** Iterate all taxRates — auto-paginates across every page. */
    list(params?: RequestBody<"taxRates.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        description?: string | undefined;
        rate?: number | undefined;
        department?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }, void, undefined>;
}
//# sourceMappingURL=tax-rates.d.ts.map