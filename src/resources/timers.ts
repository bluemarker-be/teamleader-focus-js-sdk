import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class TimersResource extends BaseResource {
  /** Get the currently running timer */
  current(params?: RequestBody<"timers.current">) {
    return this.client.request<ResponseBody<"timers.current">>("/timers.current", params);
  }

  /** Start a new timer */
  start(params: RequestBody<"timers.start">) {
    return this.client.request<ResponseBody<"timers.start">>("/timers.start", params);
  }

  /** Stop the running timer */
  stop(params?: RequestBody<"timers.stop">) {
    return this.client.request<ResponseBody<"timers.stop">>("/timers.stop", params);
  }

  /** Update the running timer */
  update(params: RequestBody<"timers.update">) {
    return this.client.request<void>("/timers.update", params);
  }
}
