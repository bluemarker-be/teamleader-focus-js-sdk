import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

/** Materials within Projects v2 */
export class ProjectMaterialsResource extends BaseResource {
  /** Iterate all NextgenProjectsMaterials — auto-paginates across every page. */
  list(params?: RequestBody<"NextgenProjectsMaterials.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"NextgenProjectsMaterials.list">>("/projects-v2/materials.list", params, options);
  }

  /** Get details for a single project material */
  info(params: RequestBody<"NextgenProjectsMaterials.info">) {
    return this.client.request<ResponseBody<"NextgenProjectsMaterials.info">>("/projects-v2/materials.info", params);
  }

  /** Create a new project material */
  create(params: RequestBody<"NextgenProjectsMaterials.create">) {
    return this.client.request<ResponseBody<"NextgenProjectsMaterials.create">>("/projects-v2/materials.create", params);
  }

  /** Update an existing project material */
  update(params: RequestBody<"NextgenProjectsMaterials.update">) {
    return this.client.request<void>("/projects-v2/materials.update", params);
  }

  /** Duplicate a project material */
  duplicate(params: RequestBody<"NextgenProjectsMaterials.duplicate">) {
    return this.client.request<ResponseBody<"NextgenProjectsMaterials.duplicate">>("/projects-v2/materials.duplicate", params);
  }

  /** Delete a project material */
  delete(params: RequestBody<"NextgenProjectsMaterials.delete">) {
    return this.client.request<void>("/projects-v2/materials.delete", params);
  }

  /** Assign a user to a project material */
  assign(params: RequestBody<"NextgenProjectsMaterials.assign">) {
    return this.client.request<void>("/projects-v2/materials.assign", params);
  }

  /** Unassign a user from a project material */
  unassign(params: RequestBody<"NextgenProjectsMaterials.unassign">) {
    return this.client.request<void>("/projects-v2/materials.unassign", params);
  }
}
