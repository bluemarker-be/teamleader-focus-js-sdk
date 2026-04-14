import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class WithholdingTaxRatesResource extends BaseResource {
  /** Iterate all withholdingTaxRates — auto-paginates across every page. */
  list(params?: RequestBody<"withholdingTaxRates.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"withholdingTaxRates.list">>("/withholdingTaxRates.list", params, options);
  }
}
