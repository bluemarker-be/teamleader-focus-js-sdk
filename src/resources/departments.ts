import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class DepartmentsResource extends BaseResource {
  /** Iterate all departments — auto-paginates across every page. */
  list(params?: RequestBody<"departments.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"departments.list">>("/departments.list", params, options);
  }

  info(params: RequestBody<"departments.info">) {
    return this.client.request<ResponseBody<"departments.info">>("/departments.info", params);
  }
}
