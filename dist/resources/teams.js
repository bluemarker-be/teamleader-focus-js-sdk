import { BaseResource } from "./base.js";
export class TeamsResource extends BaseResource {
    /** Iterate all teams — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/teams.list", params, options);
    }
}
//# sourceMappingURL=teams.js.map