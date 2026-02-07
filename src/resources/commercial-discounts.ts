import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class CommercialDiscountsResource extends BaseResource {
  list(params?: RequestBody<"commercialDiscounts.list">) {
    return this.client.request<ResponseBody<"commercialDiscounts.list">>("/commercialDiscounts.list", params);
  }
}
