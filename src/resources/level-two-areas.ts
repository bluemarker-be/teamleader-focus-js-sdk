import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class LevelTwoAreasResource extends BaseResource {
  /** Iterate all levelTwoAreas — auto-paginates across every page. */
  list(params: RequestBody<"levelTwoAreas.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"levelTwoAreas.list">>("/levelTwoAreas.list", params, options);
  }
}
