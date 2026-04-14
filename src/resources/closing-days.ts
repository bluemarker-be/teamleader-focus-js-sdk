import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class ClosingDaysResource extends BaseResource {
  /** Iterate all closingDays — auto-paginates across every page. */
  list(params?: RequestBody<"closingDays.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"closingDays.list">>("/closingDays.list", params, options);
  }

  add(params: RequestBody<"closingDays.add">) {
    return this.client.request<ResponseBody<"closingDays.add">>("/closingDays.add", params);
  }

  delete(params: RequestBody<"closingDays.delete">) {
    return this.client.request<void>("/closingDays.delete", params);
  }
}
