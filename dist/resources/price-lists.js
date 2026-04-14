import { BaseResource } from "./base.js";
export class PriceListsResource extends BaseResource {
    /** Iterate all priceLists — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/priceLists.list", params, options);
    }
}
//# sourceMappingURL=price-lists.js.map