import { BaseResource } from "./base.js";
export class DaysOffResource extends BaseResource {
    /** Import days off in bulk */
    import(params) {
        return this.client.request("/daysOff.import", params);
    }
    /** Delete days off in bulk */
    bulkDelete(params) {
        return this.client.request("/daysOff.bulkDelete", params);
    }
}
//# sourceMappingURL=days-off.js.map