import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class CallsResource extends BaseResource {
  /** Iterate all calls — auto-paginates across every page. */
  list(params?: RequestBody<"calls.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"calls.list">>("/calls.list", params, options);
  }

  /** Get details for a single call */
  info(params: RequestBody<"calls.info">) {
    return this.client.request<ResponseBody<"calls.info">>("/calls.info", params);
  }

  /** Log a new call */
  add(params: RequestBody<"calls.add">) {
    return this.client.request<ResponseBody<"calls.add">>("/calls.add", params);
  }

  /** Update an existing call */
  update(params: RequestBody<"calls.update">) {
    return this.client.request<void>("/calls.update", params);
  }

  /** Delete a call */
  delete(params: RequestBody<"calls.delete">) {
    return this.client.request<void>("/calls.delete", params);
  }

  /** Mark a call as complete */
  complete(params: RequestBody<"calls.complete">) {
    return this.client.request<void>("/calls.complete", params);
  }
}
