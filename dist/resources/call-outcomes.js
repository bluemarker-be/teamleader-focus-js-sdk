import { BaseResource } from "./base.js";
export class CallOutcomesResource extends BaseResource {
    /** Iterate all callOutcomes — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/callOutcomes.list", params, options);
    }
}
//# sourceMappingURL=call-outcomes.js.map