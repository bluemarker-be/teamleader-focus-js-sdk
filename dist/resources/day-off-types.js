import { BaseResource } from "./base.js";
export class DayOffTypesResource extends BaseResource {
    list() {
        return this.client.request("/dayOffTypes.list");
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