import { BaseResource } from "./base.js";
export class CallOutcomesResource extends BaseResource {
    /** Get a list of call outcomes */
    list(params) {
        return this.client.request("/callOutcomes.list", params);
    }
}
//# sourceMappingURL=call-outcomes.js.map