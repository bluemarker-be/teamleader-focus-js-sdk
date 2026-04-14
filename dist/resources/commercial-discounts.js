import { BaseResource } from "./base.js";
export class CommercialDiscountsResource extends BaseResource {
    /** Iterate all commercialDiscounts — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/commercialDiscounts.list", params, options);
    }
}
//# sourceMappingURL=commercial-discounts.js.map