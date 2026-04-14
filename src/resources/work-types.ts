import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class WorkTypesResource extends BaseResource {
  /** Iterate all workTypes — auto-paginates across every page. */
  list(params?: RequestBody<"workTypes.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"workTypes.list">>("/workTypes.list", params, options);
  }
}
