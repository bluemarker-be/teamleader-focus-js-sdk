import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class TicketStatusResource extends BaseResource {
  list(params?: RequestBody<"ticketStatus.list">) {
    return this.client.request<ResponseBody<"ticketStatus.list">>("/ticketStatus.list", params);
  }
}
