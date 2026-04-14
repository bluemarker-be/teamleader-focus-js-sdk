import { BaseResource } from "./base.js";
export class WorkTypesResource extends BaseResource {
    /** Iterate all workTypes — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/workTypes.list", params, options);
    }
}
//# sourceMappingURL=work-types.js.map