import { BaseResource } from "./base.js";
export class ProjectLinesResource extends BaseResource {
    list(params) {
        return this.client.request("/projects-v2/projectLines.list", params);
    }
    addToGroup(params) {
        return this.client.request("/projects-v2/projectLines.addToGroup", params);
    }
    removeFromGroup(params) {
        return this.client.request("/projects-v2/projectLines.removeFromGroup", params);
    }
}
//# sourceMappingURL=project-lines.js.map