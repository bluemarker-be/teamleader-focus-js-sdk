import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

/** Project lines within Projects v2 */
export class ProjectLinesResource extends BaseResource {
  /** Iterate all projectLines — auto-paginates across every page. */
  list(params: RequestBody<"projectLines.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"projectLines.list">>("/projects-v2/projectLines.list", params, options);
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
