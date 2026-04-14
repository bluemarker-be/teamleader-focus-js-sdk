import { BaseResource } from "./base.js";
export class BusinessTypesResource extends BaseResource {
    /** Iterate all businessTypes — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/businessTypes.list", params, options);
    }
}
//# sourceMappingURL=business-types.js.map