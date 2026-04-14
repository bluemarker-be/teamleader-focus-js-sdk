import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class BusinessTypesResource extends BaseResource {
  /** Iterate all businessTypes — auto-paginates across every page. */
  list(params: RequestBody<"businessTypes.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"businessTypes.list">>("/businessTypes.list", params, options);
  }
}
