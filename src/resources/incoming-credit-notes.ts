import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class IncomingCreditNotesResource extends BaseResource {
  /** Add a new incoming credit note */
  add(params: RequestBody<"incomingCreditNotes.add">) {
    return this.client.request<ResponseBody<"incomingCreditNotes.add">>("/incomingCreditNotes.add", params);
  }

  /** Get details for a single incoming credit note */
  info(params: RequestBody<"incomingCreditNotes.info">) {
    return this.client.request<ResponseBody<"incomingCreditNotes.info">>("/incomingCreditNotes.info", params);
  }

  /** Update an existing incoming credit note */
  update(params: RequestBody<"incomingCreditNotes.update">) {
    return this.client.request<void>("/incomingCreditNotes.update", params);
  }

  /** Delete an incoming credit note */
  delete(params: RequestBody<"incomingCreditNotes.delete">) {
    return this.client.request<void>("/incomingCreditNotes.delete", params);
  }

  /** Approve an incoming credit note */
  approve(params: RequestBody<"incomingCreditNotes.approve">) {
    return this.client.request<void>("/incomingCreditNotes.approve", params);
  }

  /** Refuse an incoming credit note */
  refuse(params: RequestBody<"incomingCreditNotes.refuse">) {
    return this.client.request<void>("/incomingCreditNotes.refuse", params);
  }

  /** Mark an incoming credit note as pending review */
  markAsPendingReview(params: RequestBody<"incomingCreditNotes.markAsPendingReview">) {
    return this.client.request<void>("/incomingCreditNotes.markAsPendingReview", params);
  }

  /** Send an incoming credit note to bookkeeping */
  sendToBookkeeping(params: RequestBody<"incomingCreditNotes.sendToBookkeeping">) {
    return this.client.request<void>("/incomingCreditNotes.sendToBookkeeping", params);
  }

  /** Get a list of payments for an incoming credit note */
  listPayments(params: RequestBody<"incomingCreditNotes.listPayments">) {
    return this.client.request<ResponseBody<"incomingCreditNotes.listPayments">>("/incomingCreditNotes.listPayments", params);
  }

  /** Register a payment for an incoming credit note */
  registerPayment(params: RequestBody<"incomingCreditNotes.registerPayment">) {
    return this.client.request<ResponseBody<"incomingCreditNotes.registerPayment">>("/incomingCreditNotes.registerPayment", params);
  }

  /** Remove a payment from an incoming credit note */
  removePayment(params: RequestBody<"incomingCreditNotes.removePayment">) {
    return this.client.request<void>("/incomingCreditNotes.removePayment", params);
  }

  /** Update a payment on an incoming credit note */
  updatePayment(params: RequestBody<"incomingCreditNotes.updatePayment">) {
    return this.client.request<void>("/incomingCreditNotes.updatePayment", params);
  }
}
