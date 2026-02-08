import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class DaysOffResource extends BaseResource {
  import(params: RequestBody<"daysOff.import">) {
    return this.client.request<ResponseBody<"daysOff.import">>("/daysOff.import", params);
  }

  bulkDelete(params: RequestBody<"daysOff.bulkDelete">) {
    return this.client.request<void>("/daysOff.bulkDelete", params);
  }
}
