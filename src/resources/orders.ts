import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class OrdersResource extends BaseResource {
  /** Get a list of orders */
  list(params?: RequestBody<"orders.list">) {
    return this.client.request<ResponseBody<"orders.list">>("/orders.list", params);
  }

  /** Get details for a single order */
  info(params: RequestBody<"orders.info">) {
    return this.client.request<ResponseBody<"orders.info">>("/orders.info", params);
  }
}
