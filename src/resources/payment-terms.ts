import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class PaymentTermsResource extends BaseResource {
  /** Iterate all paymentTerms — auto-paginates across every page. */
  list(params?: RequestBody<"paymentTerms.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"paymentTerms.list">>("/paymentTerms.list", params, options);
  }
}
