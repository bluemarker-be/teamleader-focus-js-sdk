import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class ReceiptsResource extends BaseResource {
  add(params: RequestBody<"receipts.add">) {
    return this.client.request<ResponseBody<"receipts.add">>("/receipts.add", params);
  }

  info(params: RequestBody<"receipts.info">) {
    return this.client.request<ResponseBody<"receipts.info">>("/receipts.info", params);
  }

  update(params: RequestBody<"receipts.update">) {
    return this.client.request<void>("/receipts.update", params);
  }

  delete(params: RequestBody<"receipts.delete">) {
    return this.client.request<void>("/receipts.delete", params);
  }

  approve(params: RequestBody<"receipts.approve">) {
    return this.client.request<void>("/receipts.approve", params);
  }

  refuse(params: RequestBody<"receipts.refuse">) {
    return this.client.request<void>("/receipts.refuse", params);
  }

  markAsPendingReview(params: RequestBody<"receipts.markAsPendingReview">) {
    return this.client.request<void>("/receipts.markAsPendingReview", params);
  }

  sendToBookkeeping(params: RequestBody<"receipts.sendToBookkeeping">) {
    return this.client.request<void>("/receipts.sendToBookkeeping", params);
  }

  listPayments(params: RequestBody<"receipts.listPayments">) {
    return this.client.request<ResponseBody<"receipts.listPayments">>("/receipts.listPayments", params);
  }

  registerPayment(params: RequestBody<"receipts.registerPayment">) {
    return this.client.request<ResponseBody<"receipts.registerPayment">>("/receipts.registerPayment", params);
  }

  removePayment(params: RequestBody<"receipts.removePayment">) {
    return this.client.request<void>("/receipts.removePayment", params);
  }

  updatePayment(params: RequestBody<"receipts.updatePayment">) {
    return this.client.request<void>("/receipts.updatePayment", params);
  }
}
