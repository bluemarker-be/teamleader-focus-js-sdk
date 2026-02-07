import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class CurrenciesResource extends BaseResource {
  exchangeRates(params: RequestBody<"currencies.exchangeRates">) {
    return this.client.request<ResponseBody<"currencies.exchangeRates">>("/currencies.exchangeRates", params);
  }
}
