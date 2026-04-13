import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class MigrateResource extends BaseResource {
  /** Migrate an old-style ID to a UUID */
  id(params: RequestBody<"migrate.id">) {
    return this.client.request<ResponseBody<"migrate.id">>("/migrate.id", params);
  }

  /** Migrate an old-style tax rate to a UUID */
  taxRate(params: RequestBody<"migrate.taxRate">) {
    return this.client.request<ResponseBody<"migrate.taxRate">>("/migrate.taxRate", params);
  }

  /** Migrate an old-style activity type to a UUID */
  activityType(params: RequestBody<"migrate.activityType">) {
    return this.client.request<ResponseBody<"migrate.activityType">>("/migrate.activityType", params);
  }
}
