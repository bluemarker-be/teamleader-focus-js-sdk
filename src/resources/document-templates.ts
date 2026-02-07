import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class DocumentTemplatesResource extends BaseResource {
  list(params: RequestBody<"documentTemplates.list">) {
    return this.client.request<ResponseBody<"documentTemplates.list">>("/documentTemplates.list", params);
  }
}
