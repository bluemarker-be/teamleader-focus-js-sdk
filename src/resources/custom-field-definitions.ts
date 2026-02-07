import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class CustomFieldDefinitionsResource extends BaseResource {
  create(params: RequestBody<"customFieldDefinitions.create">) {
    return this.client.request<ResponseBody<"customFieldDefinitions.create">>("/customFieldDefinitions.create", params);
  }

  list(params?: RequestBody<"customFieldDefinitions.list">) {
    return this.client.request<ResponseBody<"customFieldDefinitions.list">>("/customFieldDefinitions.list", params);
  }

  info(params: RequestBody<"customFieldDefinitions.info">) {
    return this.client.request<ResponseBody<"customFieldDefinitions.info">>("/customFieldDefinitions.info", params);
  }
}
