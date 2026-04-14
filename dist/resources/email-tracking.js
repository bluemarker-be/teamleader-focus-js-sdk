import { BaseResource } from "./base.js";
export class EmailTrackingResource extends BaseResource {
    /** Iterate all emailTracking — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/emailTracking.list", params, options);
    }
    create(params) {
        return this.client.request("/emailTracking.create", params);
    }
}
//# sourceMappingURL=email-tracking.js.map