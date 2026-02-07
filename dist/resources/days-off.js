import { BaseResource } from "./base.js";
export class DaysOffResource extends BaseResource {
    import(params) {
        return this.client.request("/daysOff.import", params);
    }
    bulkDelete(params) {
        return this.client.request("/daysOff.bulkDelete", params);
    }
}
//# sourceMappingURL=days-off.js.map