import { BaseResource } from "./base.js";
export class OrdersResource extends BaseResource {
    list(params) {
        return this.client.request("/orders.list", params);
    }
    info(params) {
        return this.client.request("/orders.info", params);
    }
}
//# sourceMappingURL=orders.js.map