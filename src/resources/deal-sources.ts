import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class DealSourcesResource extends BaseResource {
  /** Iterate all dealSources — auto-paginates across every page. */
  list(params?: RequestBody<"dealSources.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"dealSources.list">>("/dealSources.list", params, options);
  }
}
