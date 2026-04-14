import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class ReservationsResource extends BaseResource {
  /** Iterate all reservations — auto-paginates across every page. */
  list(params?: RequestBody<"reservations.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"reservations.list">>("/reservations.list", params, options);
  }

  create(params: RequestBody<"reservations.create">) {
    return this.client.request<ResponseBody<"reservations.create">>("/reservations.create", params);
  }

  update(params: RequestBody<"reservations.update">) {
    return this.client.request<void>("/reservations.update", params);
  }

  delete(params: RequestBody<"reservations.delete">) {
    return this.client.request<void>("/reservations.delete", params);
  }
}
