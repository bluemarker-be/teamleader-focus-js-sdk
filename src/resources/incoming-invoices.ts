import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class IncomingInvoicesResource extends BaseResource {
  add(params: RequestBody<"incomingInvoices.add">) {
    return this.client.request<ResponseBody<"incomingInvoices.add">>("/incomingInvoices.add", params);
  }

  info(params: RequestBody<"incomingInvoices.info">) {
    return this.client.request<ResponseBody<"incomingInvoices.info">>("/incomingInvoices.info", params);
  }

  update(params: RequestBody<"incomingInvoices.update">) {
    return this.client.request<void>("/incomingInvoices.update", params);
  }

  delete(params: RequestBody<"incomingInvoices.delete">) {
    return this.client.request<void>("/incomingInvoices.delete", params);
  }

  approve(params: RequestBody<"incomingInvoices.approve">) {
    return this.client.request<void>("/incomingInvoices.approve", params);
  }

  refuse(params: RequestBody<"incomingInvoices.refuse">) {
    return this.client.request<void>("/incomingInvoices.refuse", params);
  }

  markAsPendingReview(params: RequestBody<"incomingInvoices.markAsPendingReview">) {
    return this.client.request<void>("/incomingInvoices.markAsPendingReview", params);
  }

  sendToBookkeeping(params: RequestBody<"incomingInvoices.sendToBookkeeping">) {
    return this.client.request<void>("/incomingInvoices.sendToBookkeeping", params);
  }

  listPayments(params: RequestBody<"incomingInvoices.listPayments">) {
    return this.client.request<ResponseBody<"incomingInvoices.listPayments">>("/incomingInvoices.listPayments", params);
  }

  registerPayment(params: RequestBody<"incomingInvoices.registerPayment">) {
    return this.client.request<ResponseBody<"incomingInvoices.registerPayment">>("/incomingInvoices.registerPayment", params);
  }

  removePayment(params: RequestBody<"incomingInvoices.removePayment">) {
    return this.client.request<void>("/incomingInvoices.removePayment", params);
  }

  updatePayment(params: RequestBody<"incomingInvoices.updatePayment">) {
    return this.client.request<void>("/incomingInvoices.updatePayment", params);
  }
}
