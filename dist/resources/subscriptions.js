import { BaseResource } from "./base.js";
export class SubscriptionsResource extends BaseResource {
    /** Iterate all subscriptions — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/subscriptions.list", params, options);
    }
    /** Get details for a single subscription */
    info(params) {
        return this.client.request("/subscriptions.info", params);
    }
    /** Create a new subscription */
    create(params) {
        return this.client.request("/subscriptions.create", params);
    }
    /** Update an existing subscription */
    update(params) {
        return this.client.request("/subscriptions.update", params);
    }
    /** Deactivate a subscription */
    deactivate(params) {
        return this.client.request("/subscriptions.deactivate", params);
    }
}
//# sourceMappingURL=subscriptions.js.map