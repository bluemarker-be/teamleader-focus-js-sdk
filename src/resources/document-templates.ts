import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class DocumentTemplatesResource extends BaseResource {
  /** Iterate all documentTemplates — auto-paginates across every page. */
  list(params: RequestBody<"documentTemplates.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"documentTemplates.list">>("/documentTemplates.list", params, options);
  }
}
