import { BaseResource } from "./base.js";
export class DealPhasesResource extends BaseResource {
    /** Get a list of deal phases for a pipeline */
    list(params) {
        return this.client.request("/dealPhases.list", params);
    }
    /** Create a new deal phase */
    create(params) {
        return this.client.request("/dealPhases.create", params);
    }
    /** Update an existing deal phase */
    update(params) {
        return this.client.request("/dealPhases.update", params);
    }
    /** Move a deal phase to a different position */
    move(params) {
        return this.client.request("/dealPhases.move", params);
    }
    /** Delete a deal phase */
    delete(params) {
        return this.client.request("/dealPhases.delete", params);
    }
}
//# sourceMappingURL=deal-phases.js.map