import { BaseResource } from "./base.js";
/** Legacy projects (pre-v2). Use ProjectsResource for the newer Projects v2 API. */
export class LegacyProjectsResource extends BaseResource {
    /** Get a list of legacy projects */
    list(params) {
        return this.client.request("/projects.list", params);
    }
    /** Get details for a single legacy project */
    info(params) {
        return this.client.request("/projects.info", params);
    }
    /** Create a new legacy project */
    create(params) {
        return this.client.request("/projects.create", params);
    }
    /** Update an existing legacy project */
    update(params) {
        return this.client.request("/projects.update", params);
    }
    /** Close a legacy project */
    close(params) {
        return this.client.request("/projects.close", params);
    }
    /** Reopen a closed legacy project */
    reopen(params) {
        return this.client.request("/projects.reopen", params);
    }
    /** Delete a legacy project */
    delete(params) {
        return this.client.request("/projects.delete", params);
    }
    /** Add a participant to a legacy project */
    addParticipant(params) {
        return this.client.request("/projects.addParticipant", params);
    }
    /** Update a participant on a legacy project */
    updateParticipant(params) {
        return this.client.request("/projects.updateParticipant", params);
    }
}
//# sourceMappingURL=legacy-projects.js.map