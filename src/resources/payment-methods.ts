import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class PaymentMethodsResource extends BaseResource {
  list(params?: RequestBody<"paymentMethods.list">) {
    return this.client.request<ResponseBody<"paymentMethods.list">>("/paymentMethods.list", params);
  }
}
