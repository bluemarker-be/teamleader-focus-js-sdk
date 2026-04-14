import { BaseResource } from "./base.js";
export class UnitsOfMeasureResource extends BaseResource {
    /** Iterate all unitsOfMeasure — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/unitsOfMeasure.list", params, options);
    }
}
//# sourceMappingURL=units-of-measure.js.map