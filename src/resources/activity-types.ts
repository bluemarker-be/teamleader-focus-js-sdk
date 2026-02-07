import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class ActivityTypesResource extends BaseResource {
  list(params?: RequestBody<"activityTypes.list">) {
    return this.client.request<ResponseBody<"activityTypes.list">>("/activityTypes.list", params);
  }
}
