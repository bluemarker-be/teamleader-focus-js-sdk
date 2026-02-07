import { BaseResource } from "./base.js";
export class CurrenciesResource extends BaseResource {
    exchangeRates(params) {
        return this.client.request("/currencies.exchangeRates", params);
    }
}
//# sourceMappingURL=currencies.js.map