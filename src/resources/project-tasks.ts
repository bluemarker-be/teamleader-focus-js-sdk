import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

/** Tasks within Projects v2 (not to be confused with standalone Tasks) */
export class ProjectTasksResource extends BaseResource {
  list(params: RequestBody<"NextgenProjectsTasks.list">) {
    return this.client.request<ResponseBody<"NextgenProjectsTasks.list">>("/projects-v2/tasks.list", params);
  }

  info(params: RequestBody<"NextgenProjectsTasks.info">) {
    return this.client.request<ResponseBody<"NextgenProjectsTasks.info">>("/projects-v2/tasks.info", params);
  }

  create(params: RequestBody<"NextgenProjectsTasks.create">) {
    return this.client.request<ResponseBody<"NextgenProjectsTasks.create">>("/projects-v2/tasks.create", params);
  }

  update(params: RequestBody<"NextgenProjectsTasks.update">) {
    return this.client.request<void>("/projects-v2/tasks.update", params);
  }

  duplicate(params: RequestBody<"NextgenProjectsTasks.duplicate">) {
    return this.client.request<ResponseBody<"NextgenProjectsTasks.duplicate">>("/projects-v2/tasks.duplicate", params);
  }

  delete(params: RequestBody<"NextgenProjectsTasks.delete">) {
    return this.client.request<void>("/projects-v2/tasks.delete", params);
  }

  assign(params: RequestBody<"NextgenProjectsTasks.assign">) {
    return this.client.request<void>("/projects-v2/tasks.assign", params);
  }

  unassign(params: RequestBody<"NextgenProjectsTasks.unassign">) {
    return this.client.request<void>("/projects-v2/tasks.unassign", params);
  }
}
