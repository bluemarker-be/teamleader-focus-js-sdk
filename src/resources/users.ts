import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class UsersResource extends BaseResource {
  /** Get the current authenticated user */
  me() {
    return this.client.request<ResponseBody<"users.me">>("/users.me");
  }

  /** Get a list of users */
  list(params?: RequestBody<"users.list">) {
    return this.client.request<ResponseBody<"users.list">>("/users.list", params);
  }

  /** Get details for a single user */
  info(params: RequestBody<"users.info">) {
    return this.client.request<ResponseBody<"users.info">>("/users.info", params);
  }

  /** Get days off for a user */
  listDaysOff(params: RequestBody<"users.listDaysOff">) {
    return this.client.request<ResponseBody<"users.listDaysOff">>("/users.listDaysOff", params);
  }

  /** Get the week schedule for a user */
  getWeekSchedule(params: RequestBody<"users.getWeekSchedule">) {
    return this.client.request<ResponseBody<"users.getWeekSchedule">>("/users.getWeekSchedule", params);
  }
}
