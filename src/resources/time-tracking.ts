import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class TimeTrackingResource extends BaseResource {
  /** Get a list of time tracking entries */
  list(params?: RequestBody<"timeTracking.list">) {
    return this.client.request<ResponseBody<"timeTracking.list">>("/timeTracking.list", params);
  }

  /** Get details for a single time tracking entry */
  info(params: RequestBody<"timeTracking.info">) {
    return this.client.request<ResponseBody<"timeTracking.info">>("/timeTracking.info", params);
  }

  /** Add a new time tracking entry */
  add(params: RequestBody<"timeTracking.add">) {
    return this.client.request<ResponseBody<"timeTracking.add">>("/timeTracking.add", params);
  }

  /** Update a time tracking entry */
  update(params: RequestBody<"timeTracking.update">) {
    return this.client.request<void>("/timeTracking.update", params);
  }

  /** Resume a time tracking entry (start timer) */
  resume(params: RequestBody<"timeTracking.resume">) {
    return this.client.request<ResponseBody<"timeTracking.resume">>("/timeTracking.resume", params);
  }

  /** Delete a time tracking entry */
  delete(params: RequestBody<"timeTracking.delete">) {
    return this.client.request<void>("/timeTracking.delete", params);
  }
}
