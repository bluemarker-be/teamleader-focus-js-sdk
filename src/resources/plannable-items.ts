import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class PlannableItemsResource extends BaseResource {
  /** Iterate all plannableItems — auto-paginates across every page. */
  list(params?: RequestBody<"plannableItems.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"plannableItems.list">>("/plannableItems.list", params, options);
  }

  /** Get details for a single plannable item */
  info(params: RequestBody<"plannableItems.info">) {
    return this.client.request<ResponseBody<"plannableItems.info">>("/plannableItems.info", params);
  }
}
