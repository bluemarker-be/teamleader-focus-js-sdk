import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class CreditNotesResource extends BaseResource {
  /** Iterate all creditNotes — auto-paginates across every page. */
  list(params?: RequestBody<"creditNotes.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"creditNotes.list">>("/creditNotes.list", params, options);
  }

  /** Get details for a single credit note */
  info(params: RequestBody<"creditNotes.info">) {
    return this.client.request<ResponseBody<"creditNotes.info">>("/creditNotes.info", params);
  }

  /** Download a credit note PDF */
  download(params: RequestBody<"creditNotes.download">) {
    return this.client.request<ResponseBody<"creditNotes.download">>("/creditNotes.download", params);
  }

  /** Send a credit note via Peppol */
  sendViaPeppol(params: RequestBody<"creditNotes.sendViaPeppol">) {
    return this.client.request<void>("/creditNotes.sendViaPeppol", params);
  }
}
