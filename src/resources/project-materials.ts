import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class ProjectMaterialsResource extends BaseResource {
  list(params: RequestBody<"NextgenProjectsMaterials.list">) {
    return this.client.request<ResponseBody<"NextgenProjectsMaterials.list">>("/projects-v2/materials.list", params);
  }

  info(params: RequestBody<"NextgenProjectsMaterials.info">) {
    return this.client.request<ResponseBody<"NextgenProjectsMaterials.info">>("/projects-v2/materials.info", params);
  }

  create(params: RequestBody<"NextgenProjectsMaterials.create">) {
    return this.client.request<ResponseBody<"NextgenProjectsMaterials.create">>("/projects-v2/materials.create", params);
  }

  update(params: RequestBody<"NextgenProjectsMaterials.update">) {
    return this.client.request<void>("/projects-v2/materials.update", params);
  }

  duplicate(params: RequestBody<"NextgenProjectsMaterials.duplicate">) {
    return this.client.request<ResponseBody<"NextgenProjectsMaterials.duplicate">>("/projects-v2/materials.duplicate", params);
  }

  delete(params: RequestBody<"NextgenProjectsMaterials.delete">) {
    return this.client.request<void>("/projects-v2/materials.delete", params);
  }

  assign(params: RequestBody<"NextgenProjectsMaterials.assign">) {
    return this.client.request<void>("/projects-v2/materials.assign", params);
  }

  unassign(params: RequestBody<"NextgenProjectsMaterials.unassign">) {
    return this.client.request<void>("/projects-v2/materials.unassign", params);
  }
}
