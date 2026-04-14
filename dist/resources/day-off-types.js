import { BaseResource } from "./base.js";
export class DayOffTypesResource extends BaseResource {
    /** Iterate all dayOffTypes — auto-paginates across every page. */
    list(_params, options) {
        return this.client.paginateItems("/dayOffTypes.list", undefined, options);
    }
    create(params) {
        return this.client.request("/dayOffTypes.create", params);
    }
    update(params) {
        return this.client.request("/dayOffTypes.update", params);
    }
    delete(params) {
        return this.client.request("/dayOffTypes.delete", params);
    }
}
//# sourceMappingURL=day-off-types.js.map