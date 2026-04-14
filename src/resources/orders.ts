import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class OrdersResource extends BaseResource {
  /** Iterate all orders — auto-paginates across every page. */
  list(params?: RequestBody<"orders.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"orders.list">>("/orders.list", params, options);
  }

  /** Get details for a single order */
  info(params: RequestBody<"orders.info">) {
    return this.client.request<ResponseBody<"orders.info">>("/orders.info", params);
  }
}
