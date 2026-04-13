import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

/** External parties within Projects v2 */
export class ExternalPartiesResource extends BaseResource {
  /** Add an external party to a project */
  addToProject(params: RequestBody<"NextgenProjectsExternalParties.addToProject">) {
    return this.client.request<void>("/projects-v2/externalParties.addToProject", params);
  }

  /** Update an external party */
  update(params: RequestBody<"NextgenProjectsExternalParties.update">) {
    return this.client.request<void>("/projects-v2/externalParties.update", params);
  }

  /** Delete an external party */
  delete(params: RequestBody<"NextgenProjectsExternalParties.delete">) {
    return this.client.request<void>("/projects-v2/externalParties.delete", params);
  }
}
