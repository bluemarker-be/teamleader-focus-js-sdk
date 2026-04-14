import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class BookkeepingSubmissionsResource extends BaseResource {
  /** Iterate all bookkeepingSubmissions — auto-paginates across every page. */
  list(params?: RequestBody<"bookkeepingSubmissions.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"bookkeepingSubmissions.list">>("/bookkeepingSubmissions.list", params, options);
  }
}
