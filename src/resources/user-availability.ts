import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class UserAvailabilityResource extends BaseResource {
  /** Get total availability for a user in a date range */
  total(params: RequestBody<"userAvailability.total">) {
    return this.client.request<ResponseBody<"userAvailability.total">>("/userAvailability.total", params);
  }

  /** Get daily availability for a user in a date range */
  daily(params: RequestBody<"userAvailability.daily">) {
    return this.client.request<ResponseBody<"userAvailability.daily">>("/userAvailability.daily", params);
  }
}
