import { BaseResource } from "./base.js";
export class PaymentTermsResource extends BaseResource {
    list(params) {
        return this.client.request("/paymentTerms.list", params);
    }
}
//# sourceMappingURL=payment-terms.js.map