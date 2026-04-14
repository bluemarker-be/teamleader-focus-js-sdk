import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class PaymentMethodsResource extends BaseResource {
    /** Iterate all paymentMethods — auto-paginates across every page. */
    list(params?: RequestBody<"paymentMethods.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        name?: string | undefined;
        status: "active" | "archived";
    }, void, undefined>;
}
//# sourceMappingURL=payment-methods.d.ts.map