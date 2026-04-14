import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class MeetingsResource extends BaseResource {
  /** Iterate all meetings — auto-paginates across every page. */
  list(params?: RequestBody<"meetings.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"meetings.list">>("/meetings.list", params, options);
  }

  /** Get details for a single meeting */
  info(params: RequestBody<"meetings.info">) {
    return this.client.request<ResponseBody<"meetings.info">>("/meetings.info", params);
  }

  /** Schedule a new meeting */
  schedule(params: RequestBody<"meetings.schedule">) {
    return this.client.request<ResponseBody<"meetings.schedule">>("/meetings.schedule", params);
  }

  /** Update an existing meeting */
  update(params: RequestBody<"meetings.update">) {
    return this.client.request<void>("/meetings.update", params);
  }

  /** Mark a meeting as complete */
  complete(params: RequestBody<"meetings.complete">) {
    return this.client.request<void>("/meetings.complete", params);
  }

  /** Create a report for a meeting */
  createReport(params: RequestBody<"meetings.createReport">) {
    return this.client.request<ResponseBody<"meetings.createReport">>("/meetings.createReport", params);
  }

  /** Delete a meeting */
  delete(params: RequestBody<"meetings.delete">) {
    return this.client.request<void>("/meetings.delete", params);
  }
}
