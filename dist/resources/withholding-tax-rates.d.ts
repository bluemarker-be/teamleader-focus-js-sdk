import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class WithholdingTaxRatesResource extends BaseResource {
    /** Iterate all withholdingTaxRates — auto-paginates across every page. */
    list(params?: RequestBody<"withholdingTaxRates.list">, options?: {
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
//# sourceMappingURL=withholding-tax-rates.d.ts.map