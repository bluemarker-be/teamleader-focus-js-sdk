import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class ClosingDaysResource extends BaseResource {
  list(params?: RequestBody<"closingDays.list">) {
    return this.client.request<ResponseBody<"closingDays.list">>("/closingDays.list", params);
  }

  add(params: RequestBody<"closingDays.add">) {
    return this.client.request<ResponseBody<"closingDays.add">>("/closingDays.add", params);
  }

  delete(params: RequestBody<"closingDays.delete">) {
    return this.client.request<void>("/closingDays.delete", params);
  }
}
