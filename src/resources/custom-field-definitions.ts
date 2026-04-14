import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class CustomFieldDefinitionsResource extends BaseResource {
  /** Create a new custom field definition */
  create(params: RequestBody<"customFieldDefinitions.create">) {
    return this.client.request<ResponseBody<"customFieldDefinitions.create">>("/customFieldDefinitions.create", params);
  }

  /** Iterate all customFieldDefinitions — auto-paginates across every page. */
  list(params?: RequestBody<"customFieldDefinitions.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"customFieldDefinitions.list">>("/customFieldDefinitions.list", params, options);
  }

  /** Get details for a single custom field definition */
  info(params: RequestBody<"customFieldDefinitions.info">) {
    return this.client.request<ResponseBody<"customFieldDefinitions.info">>("/customFieldDefinitions.info", params);
  }
}
