import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class TasksResource extends BaseResource {
  list(params?: RequestBody<"tasks.list">) {
    return this.client.request<ResponseBody<"tasks.list">>("/tasks.list", params);
  }

  info(params: RequestBody<"tasks.info">) {
    return this.client.request<ResponseBody<"tasks.info">>("/tasks.info", params);
  }

  create(params: RequestBody<"tasks.create">) {
    return this.client.request<ResponseBody<"tasks.create">>("/tasks.create", params);
  }

  update(params: RequestBody<"tasks.update">) {
    return this.client.request<void>("/tasks.update", params);
  }

  complete(params: RequestBody<"tasks.complete">) {
    return this.client.request<void>("/tasks.complete", params);
  }

  reopen(params: RequestBody<"tasks.reopen">) {
    return this.client.request<void>("/tasks.reopen", params);
  }

  schedule(params: RequestBody<"tasks.schedule">) {
    return this.client.request<void>("/tasks.schedule", params);
  }

  delete(params: RequestBody<"tasks.delete">) {
    return this.client.request<void>("/tasks.delete", params);
  }
}
