import { BaseResource } from "./base.js";
export class WebhooksResource extends BaseResource {
    /** Register a new webhook */
    register(params) {
        return this.client.request("/webhooks.register", params);
    }
    /** Iterate all webhooks — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/webhooks.list", params, options);
    }
    /** Unregister a webhook */
    unregister(params) {
        return this.client.request("/webhooks.unregister", params);
    }
}
//# sourceMappingURL=webhooks.js.map