import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class LostReasonsResource extends BaseResource {
  /** Iterate all lostReasons — auto-paginates across every page. */
  list(params?: RequestBody<"lostReasons.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"lostReasons.list">>("/lostReasons.list", params, options);
  }
}
