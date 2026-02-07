import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class WorkTypesResource extends BaseResource {
  list(params?: RequestBody<"workTypes.list">) {
    return this.client.request<ResponseBody<"workTypes.list">>("/workTypes.list", params);
  }
}
