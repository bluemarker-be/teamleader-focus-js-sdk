import { BaseResource } from "./base.js";
export class ExternalPartiesResource extends BaseResource {
    addToProject(params) {
        return this.client.request("/projects-v2/externalParties.addToProject", params);
    }
    update(params) {
        return this.client.request("/projects-v2/externalParties.update", params);
    }
    delete(params) {
        return this.client.request("/projects-v2/externalParties.delete", params);
    }
}
//# sourceMappingURL=external-parties.js.map