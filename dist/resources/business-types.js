import { BaseResource } from "./base.js";
export class BusinessTypesResource extends BaseResource {
    list(params) {
        return this.client.request("/businessTypes.list", params);
    }
}
//# sourceMappingURL=business-types.js.map