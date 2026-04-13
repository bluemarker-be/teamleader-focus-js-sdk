import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

/** Tasks within Projects v2 (not to be confused with standalone Tasks) */
export class ProjectTasksResource extends BaseResource {
  /** Get a list of project tasks */
  list(params?: RequestBody<"NextgenProjectsTasks.list">) {
    return this.client.request<ResponseBody<"NextgenProjectsTasks.list">>("/projects-v2/tasks.list", params);
  }

  /** Get details for a single project task */
  info(params: RequestBody<"NextgenProjectsTasks.info">) {
    return this.client.request<ResponseBody<"NextgenProjectsTasks.info">>("/projects-v2/tasks.info", params);
  }

  /** Create a new project task */
  create(params: RequestBody<"NextgenProjectsTasks.create">) {
    return this.client.request<ResponseBody<"NextgenProjectsTasks.create">>("/projects-v2/tasks.create", params);
  }

  /** Update an existing project task */
  update(params: RequestBody<"NextgenProjectsTasks.update">) {
    return this.client.request<void>("/projects-v2/tasks.update", params);
  }

  /** Duplicate a project task */
  duplicate(params: RequestBody<"NextgenProjectsTasks.duplicate">) {
    return this.client.request<ResponseBody<"NextgenProjectsTasks.duplicate">>("/projects-v2/tasks.duplicate", params);
  }

  /** Delete a project task */
  delete(params: RequestBody<"NextgenProjectsTasks.delete">) {
    return this.client.request<void>("/projects-v2/tasks.delete", params);
  }

  /** Assign a user to a project task */
  assign(params: RequestBody<"NextgenProjectsTasks.assign">) {
    return this.client.request<void>("/projects-v2/tasks.assign", params);
  }

  /** Unassign a user from a project task */
  unassign(params: RequestBody<"NextgenProjectsTasks.unassign">) {
    return this.client.request<void>("/projects-v2/tasks.unassign", params);
  }
}
