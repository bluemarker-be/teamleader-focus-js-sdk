import { BaseResource } from "./base.js";
export class LevelTwoAreasResource extends BaseResource {
    /** Get a list of level two areas */
    list(params) {
        return this.client.request("/levelTwoAreas.list", params);
    }
}
//# sourceMappingURL=level-two-areas.js.map