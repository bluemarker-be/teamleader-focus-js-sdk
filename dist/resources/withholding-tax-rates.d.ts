import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class WithholdingTaxRatesResource extends BaseResource {
    list(params?: RequestBody<"withholdingTaxRates.list">): Promise<{
        data?: {
            id?: string | undefined;
            description?: string | undefined;
            rate?: number | undefined;
            department?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
        }[] | undefined;
    }>;
}
//# sourceMappingURL=withholding-tax-rates.d.ts.map