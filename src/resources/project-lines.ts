import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

/** Project lines within Projects v2 */
export class ProjectLinesResource extends BaseResource {
  /** Get a list of project lines */
  list(params: RequestBody<"projectLines.list">) {
    return this.client.request<ResponseBody<"projectLines.list">>("/projects-v2/projectLines.list", params);
  }

  /** Add a project line to a group */
  addToGroup(params: RequestBody<"projectLines.addToGroup">) {
    return this.client.request<void>("/projects-v2/projectLines.addToGroup", params);
  }

  /** Remove a project line from a group */
  removeFromGroup(params: RequestBody<"projectLines.removeFromGroup">) {
    return this.client.request<void>("/projects-v2/projectLines.removeFromGroup", params);
  }
}
