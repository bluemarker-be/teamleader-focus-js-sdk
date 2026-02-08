import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class CreditNotesResource extends BaseResource {
  list(params?: RequestBody<"creditNotes.list">) {
    return this.client.request<ResponseBody<"creditNotes.list">>("/creditNotes.list", params);
  }

  info(params: RequestBody<"creditNotes.info">) {
    return this.client.request<ResponseBody<"creditNotes.info">>("/creditNotes.info", params);
  }

  download(params: RequestBody<"creditNotes.download">) {
    return this.client.request<ResponseBody<"creditNotes.download">>("/creditNotes.download", params);
  }

  /** Send a credit note via Peppol */
  sendViaPeppol(params: RequestBody<"creditNotes.sendViaPeppol">) {
    return this.client.request<void>("/creditNotes.sendViaPeppol", params);
  }
}
