import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class ExternalPartiesResource extends BaseResource {
  addToProject(params: RequestBody<"NextgenProjectsExternalParties.addToProject">) {
    return this.client.request<void>("/projects-v2/externalParties.addToProject", params);
  }

  update(params: RequestBody<"NextgenProjectsExternalParties.update">) {
    return this.client.request<void>("/projects-v2/externalParties.update", params);
  }

  delete(params: RequestBody<"NextgenProjectsExternalParties.delete">) {
    return this.client.request<void>("/projects-v2/externalParties.delete", params);
  }
}
