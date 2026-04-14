import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class ExpensesResource extends BaseResource {
  /** Iterate all expenses — auto-paginates across every page. */
  list(params?: RequestBody<"expenses.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"expenses.list">>("/expenses.list", params, options);
  }
}
