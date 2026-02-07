import { BaseResource } from "./base.js";
export class TaxRatesResource extends BaseResource {
    list(params) {
        return this.client.request("/taxRates.list", params);
    }
}
//# sourceMappingURL=tax-rates.js.map