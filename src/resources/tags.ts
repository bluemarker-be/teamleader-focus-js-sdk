import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class TagsResource extends BaseResource {
  /** Iterate all tags — auto-paginates across every page. */
  list(params?: RequestBody<"tags.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"tags.list">>("/tags.list", params, options);
  }
}
