import { BaseResource } from "./base.js";
export class MeetingsResource extends BaseResource {
    list(params) {
        return this.client.request("/meetings.list", params);
    }
    info(params) {
        return this.client.request("/meetings.info", params);
    }
    schedule(params) {
        return this.client.request("/meetings.schedule", params);
    }
    update(params) {
        return this.client.request("/meetings.update", params);
    }
    complete(params) {
        return this.client.request("/meetings.complete", params);
    }
    createReport(params) {
        return this.client.request("/meetings.createReport", params);
    }
    delete(params) {
        return this.client.request("/meetings.delete", params);
    }
}
//# sourceMappingURL=meetings.js.map