import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class ProjectLinesResource extends BaseResource {
  list(params: RequestBody<"projectLines.list">) {
    return this.client.request<ResponseBody<"projectLines.list">>("/projects-v2/projectLines.list", params);
  }

  addToGroup(params: RequestBody<"projectLines.addToGroup">) {
    return this.client.request<void>("/projects-v2/projectLines.addToGroup", params);
  }

  removeFromGroup(params: RequestBody<"projectLines.removeFromGroup">) {
    return this.client.request<void>("/projects-v2/projectLines.removeFromGroup", params);
  }
}
