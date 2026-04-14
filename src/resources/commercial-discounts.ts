import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class CommercialDiscountsResource extends BaseResource {
  /** Iterate all commercialDiscounts — auto-paginates across every page. */
  list(params?: RequestBody<"commercialDiscounts.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"commercialDiscounts.list">>("/commercialDiscounts.list", params, options);
  }
}
