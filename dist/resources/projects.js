import { BaseResource } from "./base.js";
export class ProjectsResource extends BaseResource {
    /** Iterate all NextgenProjects — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/projects-v2/projects.list", params, options);
    }
    /** Get details for a single project */
    info(params) {
        return this.client.request("/projects-v2/projects.info", params);
    }
    /** Create a new project */
    create(params) {
        return this.client.request("/projects-v2/projects.create", params);
    }
    /** Update an existing project */
    update(params) {
        return this.client.request("/projects-v2/projects.update", params);
    }
    /** Close a project */
    close(params) {
        return this.client.request("/projects-v2/projects.close", params);
    }
    /** Reopen a closed project */
    reopen(params) {
        return this.client.request("/projects-v2/projects.reopen", params);
    }
    /** Duplicate a project */
    duplicate(params) {
        return this.client.request("/projects-v2/projects.duplicate", params);
    }
    /** Delete a project */
    delete(params) {
        return this.client.request("/projects-v2/projects.delete", params);
    }
    /** Add an owner to a project */
    addOwner(params) {
        return this.client.request("/projects-v2/projects.addOwner", params);
    }
    /** Remove an owner from a project */
    removeOwner(params) {
        return this.client.request("/projects-v2/projects.removeOwner", params);
    }
    /** Assign a user to a project */
    assign(params) {
        return this.client.request("/projects-v2/projects.assign", params);
    }
    /** Unassign a user from a project */
    unassign(params) {
        return this.client.request("/projects-v2/projects.unassign", params);
    }
    /** Add a customer to a project */
    addCustomer(params) {
        return this.client.request("/projects-v2/projects.addCustomer", params);
    }
    /** Remove a customer from a project */
    removeCustomer(params) {
        return this.client.request("/projects-v2/projects.removeCustomer", params);
    }
    /** Link a deal to a project */
    addDeal(params) {
        return this.client.request("/projects-v2/projects.addDeal", params);
    }
    /** Unlink a deal from a project */
    removeDeal(params) {
        return this.client.request("/projects-v2/projects.removeDeal", params);
    }
    /** Link a quotation to a project */
    addQuotation(params) {
        return this.client.request("/projects-v2/projects.addQuotation", params);
    }
    /** Unlink a quotation from a project */
    removeQuotation(params) {
        return this.client.request("/projects-v2/projects.removeQuotation", params);
    }
}
//# sourceMappingURL=projects.js.map