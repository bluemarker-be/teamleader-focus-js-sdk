import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class MailTemplatesResource extends BaseResource {
  list(params?: RequestBody<"mailTemplates.list">) {
    return this.client.request<ResponseBody<"mailTemplates.list">>("/mailTemplates.list", params);
  }
}
