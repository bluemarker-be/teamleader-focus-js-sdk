import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class DepartmentsResource extends BaseResource {
  list(params?: RequestBody<"departments.list">) {
    return this.client.request<ResponseBody<"departments.list">>("/departments.list", params);
  }

  info(params: RequestBody<"departments.info">) {
    return this.client.request<ResponseBody<"departments.info">>("/departments.info", params);
  }
}
