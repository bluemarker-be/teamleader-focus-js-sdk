import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class ActivityTypesResource extends BaseResource {
  /** Iterate all activityTypes — auto-paginates across every page. */
  list(params?: RequestBody<"activityTypes.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"activityTypes.list">>("/activityTypes.list", params, options);
  }
}
