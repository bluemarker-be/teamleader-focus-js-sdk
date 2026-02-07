import { BaseResource } from "./base.js";
export class LostReasonsResource extends BaseResource {
    list(params) {
        return this.client.request("/lostReasons.list", params);
    }
}
//# sourceMappingURL=lost-reasons.js.map