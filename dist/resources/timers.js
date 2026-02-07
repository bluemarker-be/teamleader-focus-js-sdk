import { BaseResource } from "./base.js";
export class TimersResource extends BaseResource {
    current(params) {
        return this.client.request("/timers.current", params);
    }
    start(params) {
        return this.client.request("/timers.start", params);
    }
    stop(params) {
        return this.client.request("/timers.stop", params);
    }
    update(params) {
        return this.client.request("/timers.update", params);
    }
}
//# sourceMappingURL=timers.js.map