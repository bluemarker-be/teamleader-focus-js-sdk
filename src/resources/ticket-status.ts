import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class TicketStatusResource extends BaseResource {
  /** Iterate all ticketStatus — auto-paginates across every page. */
  list(params?: RequestBody<"ticketStatus.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"ticketStatus.list">>("/ticketStatus.list", params, options);
  }
}
