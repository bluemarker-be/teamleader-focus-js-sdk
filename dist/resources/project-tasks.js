import { BaseResource } from "./base.js";
/** Tasks within Projects v2 (not to be confused with standalone Tasks) */
export class ProjectTasksResource extends BaseResource {
    list(params) {
        return this.client.request("/projects-v2/tasks.list", params);
    }
    info(params) {
        return this.client.request("/projects-v2/tasks.info", params);
    }
    create(params) {
        return this.client.request("/projects-v2/tasks.create", params);
    }
    update(params) {
        return this.client.request("/projects-v2/tasks.update", params);
    }
    duplicate(params) {
        return this.client.request("/projects-v2/tasks.duplicate", params);
    }
    delete(params) {
        return this.client.request("/projects-v2/tasks.delete", params);
    }
    assign(params) {
        return this.client.request("/projects-v2/tasks.assign", params);
    }
    unassign(params) {
        return this.client.request("/projects-v2/tasks.unassign", params);
    }
}
//# sourceMappingURL=project-tasks.js.map