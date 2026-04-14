import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class EmailTrackingResource extends BaseResource {
  /** Iterate all emailTracking — auto-paginates across every page. */
  list(params: RequestBody<"emailTracking.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"emailTracking.list">>("/emailTracking.list", params, options);
  }

  create(params: RequestBody<"emailTracking.create">) {
    return this.client.request<ResponseBody<"emailTracking.create">>("/emailTracking.create", params);
  }
}
