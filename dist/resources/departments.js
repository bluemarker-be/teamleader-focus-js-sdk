import { BaseResource } from "./base.js";
export class DepartmentsResource extends BaseResource {
    list(params) {
        return this.client.request("/departments.list", params);
    }
    info(params) {
        return this.client.request("/departments.info", params);
    }
}
//# sourceMappingURL=departments.js.map