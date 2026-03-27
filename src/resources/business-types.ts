import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class BusinessTypesResource extends BaseResource {
  list(params: RequestBody<"businessTypes.list">) {
    return this.client.request<ResponseBody<"businessTypes.list">>("/businessTypes.list", params);
  }
}
