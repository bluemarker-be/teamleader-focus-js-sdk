import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class TaxRatesResource extends BaseResource {
  /** Iterate all taxRates — auto-paginates across every page. */
  list(params?: RequestBody<"taxRates.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"taxRates.list">>("/taxRates.list", params, options);
  }
}
