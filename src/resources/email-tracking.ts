import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class EmailTrackingResource extends BaseResource {
  list(params: RequestBody<"emailTracking.list">) {
    return this.client.request<ResponseBody<"emailTracking.list">>("/emailTracking.list", params);
  }

  create(params: RequestBody<"emailTracking.create">) {
    return this.client.request<ResponseBody<"emailTracking.create">>("/emailTracking.create", params);
  }
}
