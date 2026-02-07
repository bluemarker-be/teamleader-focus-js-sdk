import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class OrdersResource extends BaseResource {
  list(params?: RequestBody<"orders.list">) {
    return this.client.request<ResponseBody<"orders.list">>("/orders.list", params);
  }

  info(params: RequestBody<"orders.info">) {
    return this.client.request<ResponseBody<"orders.info">>("/orders.info", params);
  }
}
