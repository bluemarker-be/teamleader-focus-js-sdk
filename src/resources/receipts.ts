import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class ReceiptsResource extends BaseResource {
  /** Add a new receipt */
  add(params: RequestBody<"receipts.add">) {
    return this.client.request<ResponseBody<"receipts.add">>("/receipts.add", params);
  }

  /** Get details for a single receipt */
  info(params: RequestBody<"receipts.info">) {
    return this.client.request<ResponseBody<"receipts.info">>("/receipts.info", params);
  }

  /** Update an existing receipt */
  update(params: RequestBody<"receipts.update">) {
    return this.client.request<void>("/receipts.update", params);
  }

  /** Delete a receipt */
  delete(params: RequestBody<"receipts.delete">) {
    return this.client.request<void>("/receipts.delete", params);
  }

  /** Approve a receipt */
  approve(params: RequestBody<"receipts.approve">) {
    return this.client.request<void>("/receipts.approve", params);
  }

  /** Refuse a receipt */
  refuse(params: RequestBody<"receipts.refuse">) {
    return this.client.request<void>("/receipts.refuse", params);
  }

  /** Mark a receipt as pending review */
  markAsPendingReview(params: RequestBody<"receipts.markAsPendingReview">) {
    return this.client.request<void>("/receipts.markAsPendingReview", params);
  }

  /** Send a receipt to bookkeeping */
  sendToBookkeeping(params: RequestBody<"receipts.sendToBookkeeping">) {
    return this.client.request<void>("/receipts.sendToBookkeeping", params);
  }

  /** Get a list of payments for a receipt */
  listPayments(params: RequestBody<"receipts.listPayments">) {
    return this.client.request<ResponseBody<"receipts.listPayments">>("/receipts.listPayments", params);
  }

  /** Register a payment for a receipt */
  registerPayment(params: RequestBody<"receipts.registerPayment">) {
    return this.client.request<ResponseBody<"receipts.registerPayment">>("/receipts.registerPayment", params);
  }

  /** Remove a payment from a receipt */
  removePayment(params: RequestBody<"receipts.removePayment">) {
    return this.client.request<void>("/receipts.removePayment", params);
  }

  /** Update a payment on a receipt */
  updatePayment(params: RequestBody<"receipts.updatePayment">) {
    return this.client.request<void>("/receipts.updatePayment", params);
  }
}
