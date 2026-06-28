import type { ListItem, RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class UserSchedulesResource extends BaseResource {
  /**
   * Iterate working schedules for one or more users, expanded per day
   * over a date range (max 7 days). Replaces the deprecated
   * `users.getWeekSchedule` endpoint.
   */
  list(params: RequestBody<"userSchedules.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"userSchedules.list">>("/userSchedules.list", params, options);
  }
}
