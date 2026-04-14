import { BaseResource } from "./base.js";
export class WithholdingTaxRatesResource extends BaseResource {
    /** Iterate all withholdingTaxRates — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/withholdingTaxRates.list", params, options);
    }
}
//# sourceMappingURL=withholding-tax-rates.js.map