import { BaseResource } from "./base.js";
/** External parties within Projects v2 */
export class ExternalPartiesResource extends BaseResource {
    /** Add an external party to a project */
    addToProject(params) {
        return this.client.request("/projects-v2/externalParties.addToProject", params);
    }
    /** Update an external party */
    update(params) {
        return this.client.request("/projects-v2/externalParties.update", params);
    }
    /** Delete an external party */
    delete(params) {
        return this.client.request("/projects-v2/externalParties.delete", params);
    }
}
//# sourceMappingURL=external-parties.js.map