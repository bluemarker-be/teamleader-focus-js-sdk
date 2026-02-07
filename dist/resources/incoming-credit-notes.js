import { BaseResource } from "./base.js";
export class IncomingCreditNotesResource extends BaseResource {
    add(params) {
        return this.client.request("/incomingCreditNotes.add", params);
    }
    info(params) {
        return this.client.request("/incomingCreditNotes.info", params);
    }
    update(params) {
        return this.client.request("/incomingCreditNotes.update", params);
    }
    delete(params) {
        return this.client.request("/incomingCreditNotes.delete", params);
    }
    approve(params) {
        return this.client.request("/incomingCreditNotes.approve", params);
    }
    refuse(params) {
        return this.client.request("/incomingCreditNotes.refuse", params);
    }
    markAsPendingReview(params) {
        return this.client.request("/incomingCreditNotes.markAsPendingReview", params);
    }
    sendToBookkeeping(params) {
        return this.client.request("/incomingCreditNotes.sendToBookkeeping", params);
    }
}
//# sourceMappingURL=incoming-credit-notes.js.map