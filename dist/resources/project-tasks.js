import { BaseResource } from "./base.js";
/** Tasks within Projects v2 (not to be confused with standalone Tasks) */
export class ProjectTasksResource extends BaseResource {
    /** Get a list of project tasks */
    list(params) {
        return this.client.request("/projects-v2/tasks.list", params);
    }
    /** Get details for a single project task */
    info(params) {
        return this.client.request("/projects-v2/tasks.info", params);
    }
    /** Create a new project task */
    create(params) {
        return this.client.request("/projects-v2/tasks.create", params);
    }
    /** Update an existing project task */
    update(params) {
        return this.client.request("/projects-v2/tasks.update", params);
    }
    /** Duplicate a project task */
    duplicate(params) {
        return this.client.request("/projects-v2/tasks.duplicate", params);
    }
    /** Delete a project task */
    delete(params) {
        return this.client.request("/projects-v2/tasks.delete", params);
    }
    /** Assign a user to a project task */
    assign(params) {
        return this.client.request("/projects-v2/tasks.assign", params);
    }
    /** Unassign a user from a project task */
    unassign(params) {
        return this.client.request("/projects-v2/tasks.unassign", params);
    }
}
//# sourceMappingURL=project-tasks.js.map