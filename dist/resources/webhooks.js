import { BaseResource } from "./base.js";
export class WebhooksResource extends BaseResource {
    /** Register a new webhook */
    register(params) {
        return this.client.request("/webhooks.register", params);
    }
    /** Get a list of registered webhooks */
    list(params) {
        return this.client.request("/webhooks.list", params);
    }
    /** Unregister a webhook */
    unregister(params) {
        return this.client.request("/webhooks.unregister", params);
    }
}
//# sourceMappingURL=webhooks.js.map