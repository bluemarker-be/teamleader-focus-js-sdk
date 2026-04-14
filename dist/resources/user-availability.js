import { BaseResource } from "./base.js";
export class UserAvailabilityResource extends BaseResource {
    /** Get total availability for a user in a date range */
    total(params) {
        return this.client.request("/userAvailability.total", params);
    }
    /** Get daily availability for a user in a date range */
    daily(params) {
        return this.client.request("/userAvailability.daily", params);
    }
}
//# sourceMappingURL=user-availability.js.map