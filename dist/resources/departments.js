import { BaseResource } from "./base.js";
export class DepartmentsResource extends BaseResource {
    /** Iterate all departments — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/departments.list", params, options);
    }
    info(params) {
        return this.client.request("/departments.info", params);
    }
}
//# sourceMappingURL=departments.js.map