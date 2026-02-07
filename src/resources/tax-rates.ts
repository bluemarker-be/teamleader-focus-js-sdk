import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class TaxRatesResource extends BaseResource {
  list(params?: RequestBody<"taxRates.list">) {
    return this.client.request<ResponseBody<"taxRates.list">>("/taxRates.list", params);
  }
}
