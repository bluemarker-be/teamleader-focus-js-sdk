import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class PlannableItemsResource extends BaseResource {
  list(params?: RequestBody<"plannableItems.list">) {
    return this.client.request<ResponseBody<"plannableItems.list">>("/plannableItems.list", params);
  }

  info(params: RequestBody<"plannableItems.info">) {
    return this.client.request<ResponseBody<"plannableItems.info">>("/plannableItems.info", params);
  }
}
