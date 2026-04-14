import { BaseResource } from "./base.js";
export class PaymentTermsResource extends BaseResource {
    /** Iterate all paymentTerms — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/paymentTerms.list", params, options);
    }
}
//# sourceMappingURL=payment-terms.js.map