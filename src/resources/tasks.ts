import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class TasksResource extends BaseResource {
  /** Get a list of tasks */
  list(params?: RequestBody<"tasks.list">) {
    return this.client.request<ResponseBody<"tasks.list">>("/tasks.list", params);
  }

  /** Get details for a single task */
  info(params: RequestBody<"tasks.info">) {
    return this.client.request<ResponseBody<"tasks.info">>("/tasks.info", params);
  }

  /** Create a new task */
  create(params: RequestBody<"tasks.create">) {
    return this.client.request<ResponseBody<"tasks.create">>("/tasks.create", params);
  }

  /** Update an existing task */
  update(params: RequestBody<"tasks.update">) {
    return this.client.request<void>("/tasks.update", params);
  }

  /** Mark a task as complete */
  complete(params: RequestBody<"tasks.complete">) {
    return this.client.request<void>("/tasks.complete", params);
  }

  /** Reopen a completed task */
  reopen(params: RequestBody<"tasks.reopen">) {
    return this.client.request<void>("/tasks.reopen", params);
  }

  /** Schedule a task */
  schedule(params: RequestBody<"tasks.schedule">) {
    return this.client.request<ResponseBody<"tasks.schedule">>("/tasks.schedule", params);
  }

  /** Delete a task */
  delete(params: RequestBody<"tasks.delete">) {
    return this.client.request<void>("/tasks.delete", params);
  }
}
