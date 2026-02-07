import { BaseResource } from "./base.js";
export class EventsResource extends BaseResource {
    list(params) {
        return this.client.request("/events.list", params);
    }
    info(params) {
        return this.client.request("/events.info", params);
    }
    create(params) {
        return this.client.request("/events.create", params);
    }
    update(params) {
        return this.client.request("/events.update", params);
    }
    cancel(params) {
        return this.client.request("/events.cancel", params);
    }
}
//# sourceMappingURL=events.js.map