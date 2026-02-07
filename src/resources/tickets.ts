import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class TicketsResource extends BaseResource {
  list(params?: RequestBody<"tickets.list">) {
    return this.client.request<ResponseBody<"tickets.list">>("/tickets.list", params);
  }

  info(params: RequestBody<"tickets.info">) {
    return this.client.request<ResponseBody<"tickets.info">>("/tickets.info", params);
  }

  create(params: RequestBody<"tickets.create">) {
    return this.client.request<ResponseBody<"tickets.create">>("/tickets.create", params);
  }

  update(params: RequestBody<"tickets.update">) {
    return this.client.request<void>("/tickets.update", params);
  }

  listMessages(params: RequestBody<"tickets.listMessages">) {
    return this.client.request<ResponseBody<"tickets.listMessages">>("/tickets.listMessages", params);
  }

  getMessage(params: RequestBody<"tickets.getMessage">) {
    return this.client.request<ResponseBody<"tickets.getMessage">>("/tickets.getMessage", params);
  }

  addReply(params: RequestBody<"tickets.addReply">) {
    return this.client.request<ResponseBody<"tickets.addReply">>("/tickets.addReply", params);
  }

  addInternalMessage(params: RequestBody<"tickets.addInternalMessage">) {
    return this.client.request<ResponseBody<"tickets.addInternalMessage">>("/tickets.addInternalMessage", params);
  }

  importMessage(params: RequestBody<"tickets.importMessage">) {
    return this.client.request<ResponseBody<"tickets.importMessage">>("/tickets.importMessage", params);
  }
}
