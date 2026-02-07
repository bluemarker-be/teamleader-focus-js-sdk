import { BaseResource } from "./base.js";
export class CommercialDiscountsResource extends BaseResource {
    list(params) {
        return this.client.request("/commercialDiscounts.list", params);
    }
}
//# sourceMappingURL=commercial-discounts.js.map