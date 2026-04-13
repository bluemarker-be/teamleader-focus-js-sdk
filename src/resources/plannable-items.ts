import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class PlannableItemsResource extends BaseResource {
  /** Get a list of plannable items */
  list(params?: RequestBody<"plannableItems.list">) {
    return this.client.request<ResponseBody<"plannableItems.list">>("/plannableItems.list", params);
  }

  /** Get details for a single plannable item */
  info(params: RequestBody<"plannableItems.info">) {
    return this.client.request<ResponseBody<"plannableItems.info">>("/plannableItems.info", params);
  }
}
