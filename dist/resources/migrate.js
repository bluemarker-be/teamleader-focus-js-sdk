import { BaseResource } from "./base.js";
export class MigrateResource extends BaseResource {
    id(params) {
        return this.client.request("/migrate.id", params);
    }
    taxRate(params) {
        return this.client.request("/migrate.taxRate", params);
    }
    activityType(params) {
        return this.client.request("/migrate.activityType", params);
    }
}
//# sourceMappingURL=migrate.js.map