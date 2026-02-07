import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class UserAvailabilityResource extends BaseResource {
  total(params: RequestBody<"userAvailability.total">) {
    return this.client.request<ResponseBody<"userAvailability.total">>("/userAvailability.total", params);
  }

  daily(params: RequestBody<"userAvailability.daily">) {
    return this.client.request<ResponseBody<"userAvailability.daily">>("/userAvailability.daily", params);
  }
}
