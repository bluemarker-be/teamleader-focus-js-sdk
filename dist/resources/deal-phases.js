import { BaseResource } from "./base.js";
export class DealPhasesResource extends BaseResource {
    list(params) {
        return this.client.request("/dealPhases.list", params);
    }
    create(params) {
        return this.client.request("/dealPhases.create", params);
    }
    update(params) {
        return this.client.request("/dealPhases.update", params);
    }
    duplicate(params) {
        return this.client.request("/dealPhases.duplicate", params);
    }
    move(params) {
        return this.client.request("/dealPhases.move", params);
    }
    delete(params) {
        return this.client.request("/dealPhases.delete", params);
    }
}
//# sourceMappingURL=deal-phases.js.map