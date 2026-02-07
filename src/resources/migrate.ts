import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class MigrateResource extends BaseResource {
  id(params: RequestBody<"migrate.id">) {
    return this.client.request<ResponseBody<"migrate.id">>("/migrate.id", params);
  }

  taxRate(params: RequestBody<"migrate.taxRate">) {
    return this.client.request<ResponseBody<"migrate.taxRate">>("/migrate.taxRate", params);
  }

  activityType(params: RequestBody<"migrate.activityType">) {
    return this.client.request<ResponseBody<"migrate.activityType">>("/migrate.activityType", params);
  }
}
