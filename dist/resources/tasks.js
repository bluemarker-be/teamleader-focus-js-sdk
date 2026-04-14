import { BaseResource } from "./base.js";
export class TasksResource extends BaseResource {
    /** Iterate all tasks — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/tasks.list", params, options);
    }
    /** Get details for a single task */
    info(params) {
        return this.client.request("/tasks.info", params);
    }
    /** Create a new task */
    create(params) {
        return this.client.request("/tasks.create", params);
    }
    /** Update an existing task */
    update(params) {
        return this.client.request("/tasks.update", params);
    }
    /** Mark a task as complete */
    complete(params) {
        return this.client.request("/tasks.complete", params);
    }
    /** Reopen a completed task */
    reopen(params) {
        return this.client.request("/tasks.reopen", params);
    }
    /** Schedule a task */
    schedule(params) {
        return this.client.request("/tasks.schedule", params);
    }
    /** Delete a task */
    delete(params) {
        return this.client.request("/tasks.delete", params);
    }
}
//# sourceMappingURL=tasks.js.map