import { BaseResource } from "./base.js";
export class ClosingDaysResource extends BaseResource {
    /** Iterate all closingDays — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/closingDays.list", params, options);
    }
    add(params) {
        return this.client.request("/closingDays.add", params);
    }
    delete(params) {
        return this.client.request("/closingDays.delete", params);
    }
}
//# sourceMappingURL=closing-days.js.map