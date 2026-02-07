import { BaseResource } from "./base.js";
export class WorkTypesResource extends BaseResource {
    list(params) {
        return this.client.request("/workTypes.list", params);
    }
}
//# sourceMappingURL=work-types.js.map