import { BaseResource } from "./base.js";
export class ActivityTypesResource extends BaseResource {
    /** Iterate all activityTypes — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/activityTypes.list", params, options);
    }
}
//# sourceMappingURL=activity-types.js.map