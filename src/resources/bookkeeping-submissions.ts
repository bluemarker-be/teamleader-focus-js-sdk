import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class BookkeepingSubmissionsResource extends BaseResource {
  list(params?: RequestBody<"bookkeepingSubmissions.list">) {
    return this.client.request<ResponseBody<"bookkeepingSubmissions.list">>("/bookkeepingSubmissions.list", params);
  }
}
