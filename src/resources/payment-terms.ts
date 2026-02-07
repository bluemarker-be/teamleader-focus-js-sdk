import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class PaymentTermsResource extends BaseResource {
  list(params?: RequestBody<"paymentTerms.list">) {
    return this.client.request<ResponseBody<"paymentTerms.list">>("/paymentTerms.list", params);
  }
}
