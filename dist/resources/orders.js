import { BaseResource } from "./base.js";
export class OrdersResource extends BaseResource {
    /** Iterate all orders — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/orders.list", params, options);
    }
    /** Get details for a single order */
    info(params) {
        return this.client.request("/orders.info", params);
    }
}
//# sourceMappingURL=orders.js.map