import { BaseResource } from "./base.js";
export class TimeTrackingResource extends BaseResource {
    /** Get a list of time tracking entries */
    list(params) {
        return this.client.request("/timeTracking.list", params);
    }
    /** Get details for a single time tracking entry */
    info(params) {
        return this.client.request("/timeTracking.info", params);
    }
    /** Add a new time tracking entry */
    add(params) {
        return this.client.request("/timeTracking.add", params);
    }
    /** Update a time tracking entry */
    update(params) {
        return this.client.request("/timeTracking.update", params);
    }
    /** Resume a time tracking entry (start timer) */
    resume(params) {
        return this.client.request("/timeTracking.resume", params);
    }
    /** Delete a time tracking entry */
    delete(params) {
        return this.client.request("/timeTracking.delete", params);
    }
}
//# sourceMappingURL=time-tracking.js.map