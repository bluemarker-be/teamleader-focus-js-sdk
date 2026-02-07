import { BaseResource } from "./base.js";
export class PaymentMethodsResource extends BaseResource {
    list(params) {
        return this.client.request("/paymentMethods.list", params);
    }
}
//# sourceMappingURL=payment-methods.js.map