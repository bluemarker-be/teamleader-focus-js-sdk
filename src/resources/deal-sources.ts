import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class DealSourcesResource extends BaseResource {
  list(params?: RequestBody<"dealSources.list">) {
    return this.client.request<ResponseBody<"dealSources.list">>("/dealSources.list", params);
  }
}
