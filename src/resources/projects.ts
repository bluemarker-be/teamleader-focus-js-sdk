import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class ProjectsResource extends BaseResource {
  /** Get a list of projects */
  list(params?: RequestBody<"NextgenProjects.list">) {
    return this.client.request<ResponseBody<"NextgenProjects.list">>("/projects-v2/projects.list", params);
  }

  /** Get details for a single project */
  info(params: RequestBody<"NextgenProjects.info">) {
    return this.client.request<ResponseBody<"NextgenProjects.info">>("/projects-v2/projects.info", params);
  }

  /** Create a new project */
  create(params: RequestBody<"NextgenProjects.create">) {
    return this.client.request<ResponseBody<"NextgenProjects.create">>("/projects-v2/projects.create", params);
  }

  /** Update an existing project */
  update(params: RequestBody<"NextgenProjects.update">) {
    return this.client.request<void>("/projects-v2/projects.update", params);
  }

  /** Close a project */
  close(params: RequestBody<"NextgenProjects.close">) {
    return this.client.request<void>("/projects-v2/projects.close", params);
  }

  /** Reopen a closed project */
  reopen(params: RequestBody<"NextgenProjects.reopen">) {
    return this.client.request<void>("/projects-v2/projects.reopen", params);
  }

  /** Delete a project */
  delete(params: RequestBody<"NextgenProjects.delete">) {
    return this.client.request<void>("/projects-v2/projects.delete", params);
  }
}
