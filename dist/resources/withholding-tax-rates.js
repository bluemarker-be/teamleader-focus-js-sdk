import { BaseResource } from "./base.js";
export class WithholdingTaxRatesResource extends BaseResource {
    list(params) {
        return this.client.request("/withholdingTaxRates.list", params);
    }
}
//# sourceMappingURL=withholding-tax-rates.js.map