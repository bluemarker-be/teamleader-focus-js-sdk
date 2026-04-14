import { BaseResource } from "./base.js";
export class PaymentMethodsResource extends BaseResource {
    /** Iterate all paymentMethods — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/paymentMethods.list", params, options);
    }
}
//# sourceMappingURL=payment-methods.js.map