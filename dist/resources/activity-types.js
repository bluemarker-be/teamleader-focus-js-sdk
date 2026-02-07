import { BaseResource } from "./base.js";
export class ActivityTypesResource extends BaseResource {
    list(params) {
        return this.client.request("/activityTypes.list", params);
    }
}
//# sourceMappingURL=activity-types.js.map