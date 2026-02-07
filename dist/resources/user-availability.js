import { BaseResource } from "./base.js";
export class UserAvailabilityResource extends BaseResource {
    total(params) {
        return this.client.request("/userAvailability.total", params);
    }
    daily(params) {
        return this.client.request("/userAvailability.daily", params);
    }
}
//# sourceMappingURL=user-availability.js.map