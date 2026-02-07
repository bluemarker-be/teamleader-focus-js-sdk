import { BaseResource } from "./base.js";
export class SubscriptionsResource extends BaseResource {
    list(params) {
        return this.client.request("/subscriptions.list", params);
    }
    info(params) {
        return this.client.request("/subscriptions.info", params);
    }
    create(params) {
        return this.client.request("/subscriptions.create", params);
    }
    update(params) {
        return this.client.request("/subscriptions.update", params);
    }
    deactivate(params) {
        return this.client.request("/subscriptions.deactivate", params);
    }
}
//# sourceMappingURL=subscriptions.js.map