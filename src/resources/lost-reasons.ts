import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class LostReasonsResource extends BaseResource {
  list(params?: RequestBody<"lostReasons.list">) {
    return this.client.request<ResponseBody<"lostReasons.list">>("/lostReasons.list", params);
  }
}
