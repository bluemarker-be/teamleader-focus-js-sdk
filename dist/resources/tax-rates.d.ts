import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class TaxRatesResource extends BaseResource {
    list(params?: RequestBody<"taxRates.list">): Promise<{
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
//# sourceMappingURL=tax-rates.d.ts.map