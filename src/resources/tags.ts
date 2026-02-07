import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class TagsResource extends BaseResource {
  list(params?: RequestBody<"tags.list">) {
    return this.client.request<ResponseBody<"tags.list">>("/tags.list", params);
  }
}
