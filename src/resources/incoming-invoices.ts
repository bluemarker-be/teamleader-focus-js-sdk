import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class IncomingInvoicesResource extends BaseResource {
  /** Add a new incoming invoice */
  add(params: RequestBody<"incomingInvoices.add">) {
    return this.client.request<ResponseBody<"incomingInvoices.add">>("/incomingInvoices.add", params);
  }

  /** Get details for a single incoming invoice */
  info(params: RequestBody<"incomingInvoices.info">) {
    return this.client.request<ResponseBody<"incomingInvoices.info">>("/incomingInvoices.info", params);
  }

  /** Update an existing incoming invoice */
  update(params: RequestBody<"incomingInvoices.update">) {
    return this.client.request<void>("/incomingInvoices.update", params);
  }

  /** Delete an incoming invoice */
  delete(params: RequestBody<"incomingInvoices.delete">) {
    return this.client.request<void>("/incomingInvoices.delete", params);
  }

  /** Approve an incoming invoice */
  approve(params: RequestBody<"incomingInvoices.approve">) {
    return this.client.request<void>("/incomingInvoices.approve", params);
  }

  /** Refuse an incoming invoice */
  refuse(params: RequestBody<"incomingInvoices.refuse">) {
    return this.client.request<void>("/incomingInvoices.refuse", params);
  }

  /** Mark an incoming invoice as pending review */
  markAsPendingReview(params: RequestBody<"incomingInvoices.markAsPendingReview">) {
    return this.client.request<void>("/incomingInvoices.markAsPendingReview", params);
  }

  /** Send an incoming invoice to bookkeeping */
  sendToBookkeeping(params: RequestBody<"incomingInvoices.sendToBookkeeping">) {
    return this.client.request<void>("/incomingInvoices.sendToBookkeeping", params);
  }

  /** Get a list of payments for an incoming invoice */
  listPayments(params: RequestBody<"incomingInvoices.listPayments">) {
    return this.client.request<ResponseBody<"incomingInvoices.listPayments">>("/incomingInvoices.listPayments", params);
  }

  /** Register a payment for an incoming invoice */
  registerPayment(params: RequestBody<"incomingInvoices.registerPayment">) {
    return this.client.request<ResponseBody<"incomingInvoices.registerPayment">>("/incomingInvoices.registerPayment", params);
  }

  /** Remove a payment from an incoming invoice */
  removePayment(params: RequestBody<"incomingInvoices.removePayment">) {
    return this.client.request<void>("/incomingInvoices.removePayment", params);
  }

  /** Update a payment on an incoming invoice */
  updatePayment(params: RequestBody<"incomingInvoices.updatePayment">) {
    return this.client.request<void>("/incomingInvoices.updatePayment", params);
  }
}
