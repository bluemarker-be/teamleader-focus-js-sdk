import { BaseResource } from "./base.js";
export class MeetingsResource extends BaseResource {
    /** Get a list of meetings */
    list(params) {
        return this.client.request("/meetings.list", params);
    }
    /** Get details for a single meeting */
    info(params) {
        return this.client.request("/meetings.info", params);
    }
    /** Schedule a new meeting */
    schedule(params) {
        return this.client.request("/meetings.schedule", params);
    }
    /** Update an existing meeting */
    update(params) {
        return this.client.request("/meetings.update", params);
    }
    /** Mark a meeting as complete */
    complete(params) {
        return this.client.request("/meetings.complete", params);
    }
    /** Create a report for a meeting */
    createReport(params) {
        return this.client.request("/meetings.createReport", params);
    }
    /** Delete a meeting */
    delete(params) {
        return this.client.request("/meetings.delete", params);
    }
}
//# sourceMappingURL=meetings.js.map