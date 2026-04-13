import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class TicketsResource extends BaseResource {
  /** Get a list of tickets */
  list(params?: RequestBody<"tickets.list">) {
    return this.client.request<ResponseBody<"tickets.list">>("/tickets.list", params);
  }

  /** Get details for a single ticket */
  info(params: RequestBody<"tickets.info">) {
    return this.client.request<ResponseBody<"tickets.info">>("/tickets.info", params);
  }

  /** Create a new ticket */
  create(params: RequestBody<"tickets.create">) {
    return this.client.request<ResponseBody<"tickets.create">>("/tickets.create", params);
  }

  /** Update an existing ticket */
  update(params: RequestBody<"tickets.update">) {
    return this.client.request<void>("/tickets.update", params);
  }

  /** Get a list of messages for a ticket */
  listMessages(params: RequestBody<"tickets.listMessages">) {
    return this.client.request<ResponseBody<"tickets.listMessages">>("/tickets.listMessages", params);
  }

  /** Get a single message from a ticket */
  getMessage(params: RequestBody<"tickets.getMessage">) {
    return this.client.request<ResponseBody<"tickets.getMessage">>("/tickets.getMessage", params);
  }

  /** Add a reply to a ticket */
  addReply(params: RequestBody<"tickets.addReply">) {
    return this.client.request<ResponseBody<"tickets.addReply">>("/tickets.addReply", params);
  }

  /** Add an internal message to a ticket */
  addInternalMessage(params: RequestBody<"tickets.addInternalMessage">) {
    return this.client.request<ResponseBody<"tickets.addInternalMessage">>("/tickets.addInternalMessage", params);
  }

  /** Import an external message into a ticket */
  importMessage(params: RequestBody<"tickets.importMessage">) {
    return this.client.request<ResponseBody<"tickets.importMessage">>("/tickets.importMessage", params);
  }
}
