import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

/** Groups within Projects v2 */
export class ProjectGroupsResource extends BaseResource {
  /** Get a list of project groups */
  list(params: RequestBody<"projectGroups.list">) {
    return this.client.request<ResponseBody<"projectGroups.list">>("/projects-v2/projectGroups.list", params);
  }

  /** Get details for a single project group */
  info(params: RequestBody<"projectGroups.info">) {
    return this.client.request<ResponseBody<"projectGroups.info">>("/projects-v2/projectGroups.info", params);
  }

  /** Create a new project group */
  create(params: RequestBody<"projectGroups.create">) {
    return this.client.request<ResponseBody<"projectGroups.create">>("/projects-v2/projectGroups.create", params);
  }

  /** Update a project group */
  update(params: RequestBody<"projectGroups.update">) {
    return this.client.request<void>("/projects-v2/projectGroups.update", params);
  }

  /** Duplicate a project group */
  duplicate(params: RequestBody<"projectGroups.duplicate">) {
    return this.client.request<ResponseBody<"projectGroups.duplicate">>("/projects-v2/projectGroups.duplicate", params);
  }

  /** Delete a project group */
  delete(params: RequestBody<"projectGroups.delete">) {
    return this.client.request<void>("/projects-v2/projectGroups.delete", params);
  }

  /** Assign a user to a project group */
  assign(params: RequestBody<"projectGroups.assign">) {
    return this.client.request<void>("/projects-v2/projectGroups.assign", params);
  }

  /** Unassign a user from a project group */
  unassign(params: RequestBody<"projectGroups.unassign">) {
    return this.client.request<void>("/projects-v2/projectGroups.unassign", params);
  }
}
