import { BaseResource } from "./base.js";
export class OrdersResource extends BaseResource {
    /** Get a list of orders */
    list(params) {
        return this.client.request("/orders.list", params);
    }
    /** Get details for a single order */
    info(params) {
        return this.client.request("/orders.info", params);
    }
}
//# sourceMappingURL=orders.js.map