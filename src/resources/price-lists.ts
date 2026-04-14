import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class PriceListsResource extends BaseResource {
  /** Iterate all priceLists — auto-paginates across every page. */
  list(params?: RequestBody<"priceLists.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"priceLists.list">>("/priceLists.list", params, options);
  }
}
