import { BaseResource } from "./base.js";
export class UsersResource extends BaseResource {
    /** Get the current authenticated user */
    me() {
        return this.client.request("/users.me");
    }
    /** Get a list of users */
    list(params) {
        return this.client.request("/users.list", params);
    }
    /** Get details for a single user */
    info(params) {
        return this.client.request("/users.info", params);
    }
    /** Get days off for a user */
    listDaysOff(params) {
        return this.client.request("/users.listDaysOff", params);
    }
    /** Get the week schedule for a user */
    getWeekSchedule(params) {
        return this.client.request("/users.getWeekSchedule", params);
    }
}
//# sourceMappingURL=users.js.map