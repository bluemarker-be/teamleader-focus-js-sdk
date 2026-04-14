import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class CallOutcomesResource extends BaseResource {
  /** Iterate all callOutcomes — auto-paginates across every page. */
  list(params?: RequestBody<"callOutcomes.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"callOutcomes.list">>("/callOutcomes.list", params, options);
  }
}
