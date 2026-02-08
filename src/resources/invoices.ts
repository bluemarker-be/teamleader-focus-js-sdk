import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class InvoicesResource extends BaseResource {
  /** Get a list of invoices */
  list(params?: RequestBody<"invoices.list">) {
    return this.client.request<ResponseBody<"invoices.list">>("/invoices.list", params);
  }

  /** Get details for a single invoice */
  info(params: RequestBody<"invoices.info">) {
    return this.client.request<ResponseBody<"invoices.info">>("/invoices.info", params);
  }

  /** Download an invoice PDF */
  download(params: RequestBody<"invoices.download">) {
    return this.client.request<ResponseBody<"invoices.download">>("/invoices.download", params);
  }

  /** Create a draft invoice */
  draft(params: RequestBody<"invoices.draft">) {
    return this.client.request<ResponseBody<"invoices.draft">>("/invoices.draft", params);
  }

  /** Update a draft invoice */
  update(params: RequestBody<"invoices.update">) {
    return this.client.request<void>("/invoices.update", params);
  }

  /** Update a booked invoice */
  updateBooked(params: RequestBody<"invoices.updateBooked">) {
    return this.client.request<void>("/invoices.updateBooked", params);
  }

  /** Copy an invoice */
  copy(params: RequestBody<"invoices.copy">) {
    return this.client.request<ResponseBody<"invoices.copy">>("/invoices.copy", params);
  }

  /** Book a draft invoice */
  book(params: RequestBody<"invoices.book">) {
    return this.client.request<void>("/invoices.book", params);
  }

  /** Delete a draft invoice */
  delete(params: RequestBody<"invoices.delete">) {
    return this.client.request<void>("/invoices.delete", params);
  }

  /** Register a payment for an invoice */
  registerPayment(params: RequestBody<"invoices.registerPayment">) {
    return this.client.request<void>("/invoices.registerPayment", params);
  }

  /** Remove payments from an invoice */
  removePayments(params: RequestBody<"invoices.removePayments">) {
    return this.client.request<void>("/invoices.removePayments", params);
  }

  /** Credit a full invoice */
  credit(params: RequestBody<"invoices.credit">) {
    return this.client.request<ResponseBody<"invoices.credit">>("/invoices.credit", params);
  }

  /** Partially credit an invoice */
  creditPartially(params: RequestBody<"invoices.creditPartially">) {
    return this.client.request<ResponseBody<"invoices.creditPartially">>("/invoices.creditPartially", params);
  }

  /** Send an invoice via email */
  send(params: RequestBody<"invoices.send">) {
    return this.client.request<void>("/invoices.send", params);
  }

  /** Send an invoice via Peppol */
  sendViaPeppol(params: RequestBody<"invoices.sendViaPeppol">) {
    return this.client.request<void>("/invoices.sendViaPeppol", params);
  }
}
