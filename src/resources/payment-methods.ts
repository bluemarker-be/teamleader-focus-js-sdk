import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class PaymentMethodsResource extends BaseResource {
  /** Iterate all paymentMethods — auto-paginates across every page. */
  list(params?: RequestBody<"paymentMethods.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"paymentMethods.list">>("/paymentMethods.list", params, options);
  }
}
