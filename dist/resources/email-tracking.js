import { BaseResource } from "./base.js";
export class EmailTrackingResource extends BaseResource {
    list(params) {
        return this.client.request("/emailTracking.list", params);
    }
    create(params) {
        return this.client.request("/emailTracking.create", params);
    }
}
//# sourceMappingURL=email-tracking.js.map