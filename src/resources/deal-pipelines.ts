import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class DealPipelinesResource extends BaseResource {
  /** Iterate all dealPipelines — auto-paginates across every page. */
  list(params?: RequestBody<"dealPipelines.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"dealPipelines.list">>("/dealPipelines.list", params, options);
  }

  /** Create a new deal pipeline */
  create(params: RequestBody<"dealPipelines.create">) {
    return this.client.request<ResponseBody<"dealPipelines.create">>("/dealPipelines.create", params);
  }

  /** Update an existing deal pipeline */
  update(params: RequestBody<"dealPipelines.update">) {
    return this.client.request<void>("/dealPipelines.update", params);
  }

  /** Mark a deal pipeline as default */
  markAsDefault(params: RequestBody<"dealPipelines.markAsDefault">) {
    return this.client.request<void>("/dealPipelines.markAsDefault", params);
  }

  /** Duplicate a deal pipeline */
  duplicate(params: RequestBody<"dealPipelines.duplicate">) {
    return this.client.request<ResponseBody<"dealPipelines.duplicate">>("/dealPipelines.duplicate", params);
  }

  /** Delete a deal pipeline */
  delete(params: RequestBody<"dealPipelines.delete">) {
    return this.client.request<void>("/dealPipelines.delete", params);
  }
}
