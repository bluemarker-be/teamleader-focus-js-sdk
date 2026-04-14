import { BaseResource } from "./base.js";
export class EventsResource extends BaseResource {
    /** Get a list of events */
    list(params) {
        return this.client.request("/events.list", params);
    }
    /** Get details for a single event */
    info(params) {
        return this.client.request("/events.info", params);
    }
    /** Create a new event */
    create(params) {
        return this.client.request("/events.create", params);
    }
    /** Update an existing event */
    update(params) {
        return this.client.request("/events.update", params);
    }
    /** Cancel an event */
    cancel(params) {
        return this.client.request("/events.cancel", params);
    }
}
//# sourceMappingURL=events.js.map