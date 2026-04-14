import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class MailTemplatesResource extends BaseResource {
  /** Iterate all mailTemplates — auto-paginates across every page. */
  list(params: RequestBody<"mailTemplates.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"mailTemplates.list">>("/mailTemplates.list", params, options);
  }
}
