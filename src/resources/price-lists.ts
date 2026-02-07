import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class PriceListsResource extends BaseResource {
  list(params?: RequestBody<"priceLists.list">) {
    return this.client.request<ResponseBody<"priceLists.list">>("/priceLists.list", params);
  }
}
