import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class ProjectsResource extends BaseResource {
  /** Iterate all NextgenProjects — auto-paginates across every page. */
  list(params?: RequestBody<"NextgenProjects.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"NextgenProjects.list">>("/projects-v2/projects.list", params, options);
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

  /** Duplicate a project */
  duplicate(params: RequestBody<"NextgenProjects.duplicate">) {
    return this.client.request<ResponseBody<"NextgenProjects.duplicate">>("/projects-v2/projects.duplicate", params);
  }

  /** Delete a project */
  delete(params: RequestBody<"NextgenProjects.delete">) {
    return this.client.request<void>("/projects-v2/projects.delete", params);
  }

  /** Add an owner to a project */
  addOwner(params: RequestBody<"NextgenProjects.addOwner">) {
    return this.client.request<void>("/projects-v2/projects.addOwner", params);
  }

  /** Remove an owner from a project */
  removeOwner(params: RequestBody<"NextgenProjects.removeOwner">) {
    return this.client.request<void>("/projects-v2/projects.removeOwner", params);
  }

  /** Assign a user to a project */
  assign(params: RequestBody<"NextgenProjects.assign">) {
    return this.client.request<void>("/projects-v2/projects.assign", params);
  }

  /** Unassign a user from a project */
  unassign(params: RequestBody<"NextgenProjects.unassign">) {
    return this.client.request<void>("/projects-v2/projects.unassign", params);
  }

  /** Add a customer to a project */
  addCustomer(params: RequestBody<"NextgenProjects.addCustomer">) {
    return this.client.request<void>("/projects-v2/projects.addCustomer", params);
  }

  /** Remove a customer from a project */
  removeCustomer(params: RequestBody<"NextgenProjects.removeCustomer">) {
    return this.client.request<void>("/projects-v2/projects.removeCustomer", params);
  }

  /** Link a deal to a project */
  addDeal(params: RequestBody<"NextgenProjects.addDeal">) {
    return this.client.request<void>("/projects-v2/projects.addDeal", params);
  }

  /** Unlink a deal from a project */
  removeDeal(params: RequestBody<"NextgenProjects.removeDeal">) {
    return this.client.request<void>("/projects-v2/projects.removeDeal", params);
  }

  /** Link a quotation to a project */
  addQuotation(params: RequestBody<"NextgenProjects.addQuotation">) {
    return this.client.request<void>("/projects-v2/projects.addQuotation", params);
  }

  /** Unlink a quotation from a project */
  removeQuotation(params: RequestBody<"NextgenProjects.removeQuotation">) {
    return this.client.request<void>("/projects-v2/projects.removeQuotation", params);
  }
}
