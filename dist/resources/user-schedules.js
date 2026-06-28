import { BaseResource } from "./base.js";
export class UserSchedulesResource extends BaseResource {
    /**
     * Iterate working schedules for one or more users, expanded per day
     * over a date range (max 7 days). Replaces the deprecated
     * `users.getWeekSchedule` endpoint.
     */
    list(params, options) {
        return this.client.paginateItems("/userSchedules.list", params, options);
    }
}
//# sourceMappingURL=user-schedules.js.map