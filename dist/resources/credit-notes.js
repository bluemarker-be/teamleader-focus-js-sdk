import { BaseResource } from "./base.js";
export class CreditNotesResource extends BaseResource {
    /** Iterate all creditNotes — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/creditNotes.list", params, options);
    }
    /** Get details for a single credit note */
    info(params) {
        return this.client.request("/creditNotes.info", params);
    }
    /** Download a credit note PDF */
    download(params) {
        return this.client.request("/creditNotes.download", params);
    }
    /** Send a credit note via Peppol */
    sendViaPeppol(params) {
        return this.client.request("/creditNotes.sendViaPeppol", params);
    }
}
//# sourceMappingURL=credit-notes.js.map