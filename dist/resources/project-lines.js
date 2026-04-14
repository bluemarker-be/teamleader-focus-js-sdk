import { BaseResource } from "./base.js";
/** Project lines within Projects v2 */
export class ProjectLinesResource extends BaseResource {
    /** Get a list of project lines */
    list(params) {
        return this.client.request("/projects-v2/projectLines.list", params);
    }
    /** Add a project line to a group */
    addToGroup(params) {
        return this.client.request("/projects-v2/projectLines.addToGroup", params);
    }
    /** Remove a project line from a group */
    removeFromGroup(params) {
        return this.client.request("/projects-v2/projectLines.removeFromGroup", params);
    }
}
//# sourceMappingURL=project-lines.js.map