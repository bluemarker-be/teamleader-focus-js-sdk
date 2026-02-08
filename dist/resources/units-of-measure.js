import { BaseResource } from "./base.js";
export class UnitsOfMeasureResource extends BaseResource {
    /** Get a list of units of measure */
    list(params) {
        return this.client.request("/unitsOfMeasure.list", params);
    }
}
//# sourceMappingURL=units-of-measure.js.map