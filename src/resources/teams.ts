import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class TeamsResource extends BaseResource {
  /** Iterate all teams — auto-paginates across every page. */
  list(params?: RequestBody<"teams.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"teams.list">>("/teams.list", params, options);
  }
}
