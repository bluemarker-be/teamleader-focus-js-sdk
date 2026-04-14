import { BaseResource } from "./base.js";
export class MigrateResource extends BaseResource {
    /** Migrate an old-style ID to a UUID */
    id(params) {
        return this.client.request("/migrate.id", params);
    }
    /** Migrate an old-style tax rate to a UUID */
    taxRate(params) {
        return this.client.request("/migrate.taxRate", params);
    }
    /** Migrate an old-style activity type to a UUID */
    activityType(params) {
        return this.client.request("/migrate.activityType", params);
    }
}
//# sourceMappingURL=migrate.js.map