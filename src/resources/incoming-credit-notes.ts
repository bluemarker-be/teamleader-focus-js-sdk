import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class IncomingCreditNotesResource extends BaseResource {
  add(params: RequestBody<"incomingCreditNotes.add">) {
    return this.client.request<ResponseBody<"incomingCreditNotes.add">>("/incomingCreditNotes.add", params);
  }

  info(params: RequestBody<"incomingCreditNotes.info">) {
    return this.client.request<ResponseBody<"incomingCreditNotes.info">>("/incomingCreditNotes.info", params);
  }

  update(params: RequestBody<"incomingCreditNotes.update">) {
    return this.client.request<void>("/incomingCreditNotes.update", params);
  }

  delete(params: RequestBody<"incomingCreditNotes.delete">) {
    return this.client.request<void>("/incomingCreditNotes.delete", params);
  }

  approve(params: RequestBody<"incomingCreditNotes.approve">) {
    return this.client.request<void>("/incomingCreditNotes.approve", params);
  }

  refuse(params: RequestBody<"incomingCreditNotes.refuse">) {
    return this.client.request<void>("/incomingCreditNotes.refuse", params);
  }

  markAsPendingReview(params: RequestBody<"incomingCreditNotes.markAsPendingReview">) {
    return this.client.request<void>("/incomingCreditNotes.markAsPendingReview", params);
  }

  sendToBookkeeping(params: RequestBody<"incomingCreditNotes.sendToBookkeeping">) {
    return this.client.request<void>("/incomingCreditNotes.sendToBookkeeping", params);
  }
}
