import { BaseResource } from "./base.js";
export class IncomingCreditNotesResource extends BaseResource {
    /** Add a new incoming credit note */
    add(params) {
        return this.client.request("/incomingCreditNotes.add", params);
    }
    /** Get details for a single incoming credit note */
    info(params) {
        return this.client.request("/incomingCreditNotes.info", params);
    }
    /** Update an existing incoming credit note */
    update(params) {
        return this.client.request("/incomingCreditNotes.update", params);
    }
    /** Delete an incoming credit note */
    delete(params) {
        return this.client.request("/incomingCreditNotes.delete", params);
    }
    /** Approve an incoming credit note */
    approve(params) {
        return this.client.request("/incomingCreditNotes.approve", params);
    }
    /** Refuse an incoming credit note */
    refuse(params) {
        return this.client.request("/incomingCreditNotes.refuse", params);
    }
    /** Mark an incoming credit note as pending review */
    markAsPendingReview(params) {
        return this.client.request("/incomingCreditNotes.markAsPendingReview", params);
    }
    /** Send an incoming credit note to bookkeeping */
    sendToBookkeeping(params) {
        return this.client.request("/incomingCreditNotes.sendToBookkeeping", params);
    }
    /** Get a list of payments for an incoming credit note */
    listPayments(params) {
        return this.client.request("/incomingCreditNotes.listPayments", params);
    }
    /** Register a payment for an incoming credit note */
    registerPayment(params) {
        return this.client.request("/incomingCreditNotes.registerPayment", params);
    }
    /** Remove a payment from an incoming credit note */
    removePayment(params) {
        return this.client.request("/incomingCreditNotes.removePayment", params);
    }
    /** Update a payment on an incoming credit note */
    updatePayment(params) {
        return this.client.request("/incomingCreditNotes.updatePayment", params);
    }
}
//# sourceMappingURL=incoming-credit-notes.js.map