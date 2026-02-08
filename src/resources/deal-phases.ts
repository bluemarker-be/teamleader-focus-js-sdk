import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class DealPhasesResource extends BaseResource {
  list(params: RequestBody<"dealPhases.list">) {
    return this.client.request<ResponseBody<"dealPhases.list">>("/dealPhases.list", params);
  }

  create(params: RequestBody<"dealPhases.create">) {
    return this.client.request<ResponseBody<"dealPhases.create">>("/dealPhases.create", params);
  }

  update(params: RequestBody<"dealPhases.update">) {
    return this.client.request<void>("/dealPhases.update", params);
  }

  move(params: RequestBody<"dealPhases.move">) {
    return this.client.request<void>("/dealPhases.move", params);
  }

  delete(params: RequestBody<"dealPhases.delete">) {
    return this.client.request<void>("/dealPhases.delete", params);
  }
}
