import { BaseResource } from "./base.js";
export class LevelTwoAreasResource extends BaseResource {
    /** Iterate all levelTwoAreas — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/levelTwoAreas.list", params, options);
    }
}
//# sourceMappingURL=level-two-areas.js.map