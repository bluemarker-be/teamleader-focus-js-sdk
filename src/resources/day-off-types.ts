import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class DayOffTypesResource extends BaseResource {
  /** Iterate all dayOffTypes — auto-paginates across every page. */
  list(_params?: undefined, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"dayOffTypes.list">>("/dayOffTypes.list", undefined, options);
  }

  create(params: RequestBody<"dayOffTypes.create">) {
    return this.client.request<ResponseBody<"dayOffTypes.create">>("/dayOffTypes.create", params);
  }

  update(params: RequestBody<"dayOffTypes.update">) {
    return this.client.request<void>("/dayOffTypes.update", params);
  }

  delete(params: RequestBody<"dayOffTypes.delete">) {
    return this.client.request<void>("/dayOffTypes.delete", params);
  }
}
