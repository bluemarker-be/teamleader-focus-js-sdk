import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class PaymentTermsResource extends BaseResource {
    /** Iterate all paymentTerms — auto-paginates across every page. */
    list(params?: RequestBody<"paymentTerms.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        type?: "cash" | "end_of_month" | "after_invoice_date" | undefined;
        days?: number | undefined;
    }, void, undefined>;
}
//# sourceMappingURL=payment-terms.d.ts.map