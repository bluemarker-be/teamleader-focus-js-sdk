import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class CallOutcomesResource extends BaseResource {
  /** Get a list of call outcomes */
  list(params?: RequestBody<"callOutcomes.list">) {
    return this.client.request<ResponseBody<"callOutcomes.list">>("/callOutcomes.list", params);
  }
}
