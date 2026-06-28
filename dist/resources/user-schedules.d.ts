import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class UserSchedulesResource extends BaseResource {
    /**
     * Iterate working schedules for one or more users, expanded per day
     * over a date range (max 7 days). Replaces the deprecated
     * `users.getWeekSchedule` endpoint.
     */
    list(params: RequestBody<"userSchedules.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        user?: {
            id?: string | undefined;
            type?: "user" | undefined;
        } | undefined;
        schedule?: {
            date?: string | undefined;
            periods?: {
                type?: "working_hours" | "lunch_break" | undefined;
                start?: {
                    time?: string | undefined;
                } | undefined;
                end?: {
                    time?: string | undefined;
                } | undefined;
            }[] | undefined;
        }[] | undefined;
    }, void, undefined>;
}
//# sourceMappingURL=user-schedules.d.ts.map