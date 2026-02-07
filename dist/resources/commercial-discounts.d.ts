import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class CommercialDiscountsResource extends BaseResource {
    list(params?: RequestBody<"commercialDiscounts.list">): Promise<{
        data?: {
            name?: string;
            department?: {
                id?: string;
                type?: string;
            };
        }[];
    }>;
}
//# sourceMappingURL=commercial-discounts.d.ts.map