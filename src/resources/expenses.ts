import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class ExpensesResource extends BaseResource {
  list(params?: RequestBody<"expenses.list">) {
    return this.client.request<ResponseBody<"expenses.list">>("/expenses.list", params);
  }
}
