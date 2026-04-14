import { BaseResource } from "./base.js";
export class TaxRatesResource extends BaseResource {
    /** Iterate all taxRates — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/taxRates.list", params, options);
    }
}
//# sourceMappingURL=tax-rates.js.map