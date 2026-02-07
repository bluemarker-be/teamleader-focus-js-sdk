import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class PaymentMethodsResource extends BaseResource {
    list(params?: RequestBody<"paymentMethods.list">): Promise<{
        data?: {
            id?: string;
            name?: string;
            status: "active" | "archived";
        }[];
    }>;
}
//# sourceMappingURL=payment-methods.d.ts.map