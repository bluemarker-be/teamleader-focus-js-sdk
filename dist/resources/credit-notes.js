import { BaseResource } from "./base.js";
export class CreditNotesResource extends BaseResource {
    list(params) {
        return this.client.request("/creditNotes.list", params);
    }
    info(params) {
        return this.client.request("/creditNotes.info", params);
    }
    download(params) {
        return this.client.request("/creditNotes.download", params);
    }
    /** Send a credit note via Peppol */
    sendViaPeppol(params) {
        return this.client.request("/creditNotes.sendViaPeppol", params);
    }
}
//# sourceMappingURL=credit-notes.js.map