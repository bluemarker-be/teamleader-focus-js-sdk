import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class PaymentTermsResource extends BaseResource {
    list(params?: RequestBody<"paymentTerms.list">): Promise<{
        data?: {
            id?: string | undefined;
            type?: "cash" | "end_of_month" | "after_invoice_date" | undefined;
            days?: number | undefined;
        }[] | undefined;
        meta?: {
            default?: string | undefined;
        } | undefined;
    }>;
}
//# sourceMappingURL=payment-terms.d.ts.map