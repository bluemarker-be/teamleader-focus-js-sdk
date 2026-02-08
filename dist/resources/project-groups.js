import { BaseResource } from "./base.js";
/** Groups within Projects v2 */
export class ProjectGroupsResource extends BaseResource {
    /** Get a list of project groups */
    list(params) {
        return this.client.request("/projects-v2/projectGroups.list", params);
    }
    /** Get details for a single project group */
    info(params) {
        return this.client.request("/projects-v2/projectGroups.info", params);
    }
    /** Create a new project group */
    create(params) {
        return this.client.request("/projects-v2/projectGroups.create", params);
    }
    /** Update a project group */
    update(params) {
        return this.client.request("/projects-v2/projectGroups.update", params);
    }
    /** Duplicate a project group */
    duplicate(params) {
        return this.client.request("/projects-v2/projectGroups.duplicate", params);
    }
    /** Delete a project group */
    delete(params) {
        return this.client.request("/projects-v2/projectGroups.delete", params);
    }
    /** Assign a user to a project group */
    assign(params) {
        return this.client.request("/projects-v2/projectGroups.assign", params);
    }
    /** Unassign a user from a project group */
    unassign(params) {
        return this.client.request("/projects-v2/projectGroups.unassign", params);
    }
}
//# sourceMappingURL=project-groups.js.map