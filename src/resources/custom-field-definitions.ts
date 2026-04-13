import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class CustomFieldDefinitionsResource extends BaseResource {
  /** Create a new custom field definition */
  create(params: RequestBody<"customFieldDefinitions.create">) {
    return this.client.request<ResponseBody<"customFieldDefinitions.create">>("/customFieldDefinitions.create", params);
  }

  /** Get a list of custom field definitions */
  list(params?: RequestBody<"customFieldDefinitions.list">) {
    return this.client.request<ResponseBody<"customFieldDefinitions.list">>("/customFieldDefinitions.list", params);
  }

  /** Get details for a single custom field definition */
  info(params: RequestBody<"customFieldDefinitions.info">) {
    return this.client.request<ResponseBody<"customFieldDefinitions.info">>("/customFieldDefinitions.info", params);
  }
}
