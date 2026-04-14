import { BaseResource } from "./base.js";
export class LostReasonsResource extends BaseResource {
    /** Iterate all lostReasons — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/lostReasons.list", params, options);
    }
}
//# sourceMappingURL=lost-reasons.js.map