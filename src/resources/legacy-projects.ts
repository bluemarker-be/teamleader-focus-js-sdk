import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

/** Legacy projects (pre-v2). Use ProjectsResource for the newer Projects v2 API. */
export class LegacyProjectsResource extends BaseResource {
  /** Get a list of legacy projects */
  list(params?: RequestBody<"LegacyProjects.list">) {
    return this.client.request<ResponseBody<"LegacyProjects.list">>("/projects.list", params);
  }

  /** Get details for a single legacy project */
  info(params: RequestBody<"LegacyProjects.info">) {
    return this.client.request<ResponseBody<"LegacyProjects.info">>("/projects.info", params);
  }

  /** Create a new legacy project */
  create(params: RequestBody<"LegacyProjects.create">) {
    return this.client.request<ResponseBody<"LegacyProjects.create">>("/projects.create", params);
  }

  /** Update an existing legacy project */
  update(params: RequestBody<"LegacyProjects.update">) {
    return this.client.request<void>("/projects.update", params);
  }

  /** Close a legacy project */
  close(params: RequestBody<"LegacyProjects.close">) {
    return this.client.request<void>("/projects.close", params);
  }

  /** Reopen a closed legacy project */
  reopen(params: RequestBody<"LegacyProjects.reopen">) {
    return this.client.request<void>("/projects.reopen", params);
  }

  /** Delete a legacy project */
  delete(params: RequestBody<"LegacyProjects.delete">) {
    return this.client.request<void>("/projects.delete", params);
  }

  /** Add a participant to a legacy project */
  addParticipant(params: RequestBody<"LegacyProjects.addParticipant">) {
    return this.client.request<void>("/projects.addParticipant", params);
  }

  /** Update a participant on a legacy project */
  updateParticipant(params: RequestBody<"LegacyProjects.updateParticipant">) {
    return this.client.request<void>("/projects.updateParticipant", params);
  }
}
