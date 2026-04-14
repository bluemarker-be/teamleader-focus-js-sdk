import { BaseResource } from "./base.js";
/** Materials within Projects v2 */
export class ProjectMaterialsResource extends BaseResource {
    /** Get a list of project materials */
    list(params) {
        return this.client.request("/projects-v2/materials.list", params);
    }
    /** Get details for a single project material */
    info(params) {
        return this.client.request("/projects-v2/materials.info", params);
    }
    /** Create a new project material */
    create(params) {
        return this.client.request("/projects-v2/materials.create", params);
    }
    /** Update an existing project material */
    update(params) {
        return this.client.request("/projects-v2/materials.update", params);
    }
    /** Duplicate a project material */
    duplicate(params) {
        return this.client.request("/projects-v2/materials.duplicate", params);
    }
    /** Delete a project material */
    delete(params) {
        return this.client.request("/projects-v2/materials.delete", params);
    }
    /** Assign a user to a project material */
    assign(params) {
        return this.client.request("/projects-v2/materials.assign", params);
    }
    /** Unassign a user from a project material */
    unassign(params) {
        return this.client.request("/projects-v2/materials.unassign", params);
    }
}
//# sourceMappingURL=project-materials.js.map