import { BaseResource } from "./base.js";
export class PriceListsResource extends BaseResource {
    list(params) {
        return this.client.request("/priceLists.list", params);
    }
}
//# sourceMappingURL=price-lists.js.map