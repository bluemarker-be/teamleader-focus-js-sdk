import { BaseResource } from "./base.js";
export class TeamsResource extends BaseResource {
    list(params) {
        return this.client.request("/teams.list", params);
    }
}
//# sourceMappingURL=teams.js.map