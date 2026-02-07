import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class DayOffTypesResource extends BaseResource {
  list() {
    return this.client.request<ResponseBody<"dayOffTypes.list">>("/dayOffTypes.list");
  }

  create(params: RequestBody<"dayOffTypes.create">) {
    return this.client.request<ResponseBody<"dayOffTypes.create">>("/dayOffTypes.create", params);
  }

  update(params: RequestBody<"dayOffTypes.update">) {
    return this.client.request<void>("/dayOffTypes.update", params);
  }

  delete(params: RequestBody<"dayOffTypes.delete">) {
    return this.client.request<void>("/dayOffTypes.delete", params);
  }
}
