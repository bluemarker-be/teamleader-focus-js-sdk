import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class DealPhasesResource extends BaseResource {
  /** Iterate all dealPhases — auto-paginates across every page. */
  list(params: RequestBody<"dealPhases.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"dealPhases.list">>("/dealPhases.list", params, options);
  }

  /** Create a new deal phase */
  create(params: RequestBody<"dealPhases.create">) {
    return this.client.request<ResponseBody<"dealPhases.create">>("/dealPhases.create", params);
  }

  /** Update an existing deal phase */
  update(params: RequestBody<"dealPhases.update">) {
    return this.client.request<void>("/dealPhases.update", params);
  }

  /** Move a deal phase to a different position */
  move(params: RequestBody<"dealPhases.move">) {
    return this.client.request<void>("/dealPhases.move", params);
  }

  /** Delete a deal phase */
  delete(params: RequestBody<"dealPhases.delete">) {
    return this.client.request<void>("/dealPhases.delete", params);
  }
}
