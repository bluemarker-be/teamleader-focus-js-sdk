import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class TaxRatesResource extends BaseResource {
    list(params?: RequestBody<"taxRates.list">): Promise<{
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
//# sourceMappingURL=tax-rates.d.ts.map