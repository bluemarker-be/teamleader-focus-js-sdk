import { BaseResource } from "./base.js";
export class ProjectsResource extends BaseResource {
    /** Get a list of projects */
    list(params) {
        return this.client.request("/projects-v2/projects.list", params);
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
    /** Delete a project */
    delete(params) {
        return this.client.request("/projects-v2/projects.delete", params);
    }
}
//# sourceMappingURL=projects.js.map