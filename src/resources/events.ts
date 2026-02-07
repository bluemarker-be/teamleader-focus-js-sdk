import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class EventsResource extends BaseResource {
  list(params?: RequestBody<"events.list">) {
    return this.client.request<ResponseBody<"events.list">>("/events.list", params);
  }

  info(params: RequestBody<"events.info">) {
    return this.client.request<ResponseBody<"events.info">>("/events.info", params);
  }

  create(params: RequestBody<"events.create">) {
    return this.client.request<ResponseBody<"events.create">>("/events.create", params);
  }

  update(params: RequestBody<"events.update">) {
    return this.client.request<void>("/events.update", params);
  }

  cancel(params: RequestBody<"events.cancel">) {
    return this.client.request<void>("/events.cancel", params);
  }
}
