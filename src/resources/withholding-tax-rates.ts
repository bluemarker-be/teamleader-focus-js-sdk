import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class WithholdingTaxRatesResource extends BaseResource {
  list(params?: RequestBody<"withholdingTaxRates.list">) {
    return this.client.request<ResponseBody<"withholdingTaxRates.list">>("/withholdingTaxRates.list", params);
  }
}
