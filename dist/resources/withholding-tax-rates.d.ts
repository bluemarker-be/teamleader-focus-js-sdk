import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class WithholdingTaxRatesResource extends BaseResource {
    list(params?: RequestBody<"withholdingTaxRates.list">): Promise<{
        data?: {
            id?: string;
            description?: string;
            rate?: number;
            department?: {
                id?: string;
                type?: string;
            };
        }[];
    }>;
}
//# sourceMappingURL=withholding-tax-rates.d.ts.map