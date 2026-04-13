import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class DealPhasesResource extends BaseResource {
  /** Get a list of deal phases for a pipeline */
  list(params: RequestBody<"dealPhases.list">) {
    return this.client.request<ResponseBody<"dealPhases.list">>("/dealPhases.list", params);
  }

  /** Create a new deal phase */
  create(params: RequestBody<"dealPhases.create">) {
    return this.client.request<ResponseBody<"dealPhases.create">>("/dealPhases.create", params);
  }

  /** Update an existing deal phase */
  update(params: RequestBody<"dealPhases.update">) {
    return this.client.request<void>("/dealPhases.update", params);
  }

  /** Move a deal phase to a different position */
  move(params: RequestBody<"dealPhases.move">) {
    return this.client.request<void>("/dealPhases.move", params);
  }

  /** Delete a deal phase */
  delete(params: RequestBody<"dealPhases.delete">) {
    return this.client.request<void>("/dealPhases.delete", params);
  }
}
