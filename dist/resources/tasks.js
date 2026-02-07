import { BaseResource } from "./base.js";
export class TasksResource extends BaseResource {
    list(params) {
        return this.client.request("/tasks.list", params);
    }
    info(params) {
        return this.client.request("/tasks.info", params);
    }
    create(params) {
        return this.client.request("/tasks.create", params);
    }
    update(params) {
        return this.client.request("/tasks.update", params);
    }
    complete(params) {
        return this.client.request("/tasks.complete", params);
    }
    reopen(params) {
        return this.client.request("/tasks.reopen", params);
    }
    schedule(params) {
        return this.client.request("/tasks.schedule", params);
    }
    delete(params) {
        return this.client.request("/tasks.delete", params);
    }
}
//# sourceMappingURL=tasks.js.map