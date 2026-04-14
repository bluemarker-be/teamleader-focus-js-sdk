import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class DealsResource extends BaseResource {
  /** Iterate all deals — auto-paginates across every page. */
  list(params?: RequestBody<"deals.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"deals.list">>("/deals.list", params, options);
  }

  /** Get details for a single deal */
  info(params: RequestBody<"deals.info">) {
    return this.client.request<ResponseBody<"deals.info">>("/deals.info", params);
  }

  /** Create a new deal */
  create(params: RequestBody<"deals.create">) {
    return this.client.request<ResponseBody<"deals.create">>("/deals.create", params);
  }

  /** Update an existing deal */
  update(params: RequestBody<"deals.update">) {
    return this.client.request<void>("/deals.update", params);
  }

  /** Move a deal to a different phase */
  move(params: RequestBody<"deals.move">) {
    return this.client.request<void>("/deals.move", params);
  }

  /** Mark a deal as won */
  win(params: RequestBody<"deals.win">) {
    return this.client.request<void>("/deals.win", params);
  }

  /** Mark a deal as lost */
  lose(params: RequestBody<"deals.lose">) {
    return this.client.request<void>("/deals.lose", params);
  }

  /** Delete a deal */
  delete(params: RequestBody<"deals.delete">) {
    return this.client.request<void>("/deals.delete", params);
  }
}
