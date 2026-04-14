import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class EventsResource extends BaseResource {
  /** Iterate all events — auto-paginates across every page. */
  list(params?: RequestBody<"events.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"events.list">>("/events.list", params, options);
  }

  /** Get details for a single event */
  info(params: RequestBody<"events.info">) {
    return this.client.request<ResponseBody<"events.info">>("/events.info", params);
  }

  /** Create a new event */
  create(params: RequestBody<"events.create">) {
    return this.client.request<ResponseBody<"events.create">>("/events.create", params);
  }

  /** Update an existing event */
  update(params: RequestBody<"events.update">) {
    return this.client.request<void>("/events.update", params);
  }

  /** Cancel an event */
  cancel(params: RequestBody<"events.cancel">) {
    return this.client.request<void>("/events.cancel", params);
  }
}
