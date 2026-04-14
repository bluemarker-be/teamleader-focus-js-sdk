import { BaseResource } from "./base.js";
export class TimersResource extends BaseResource {
    /** Get the currently running timer */
    current(params) {
        return this.client.request("/timers.current", params);
    }
    /** Start a new timer */
    start(params) {
        return this.client.request("/timers.start", params);
    }
    /** Stop the running timer */
    stop(params) {
        return this.client.request("/timers.stop", params);
    }
    /** Update the running timer */
    update(params) {
        return this.client.request("/timers.update", params);
    }
}
//# sourceMappingURL=timers.js.map