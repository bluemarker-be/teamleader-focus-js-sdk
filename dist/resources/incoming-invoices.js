import { BaseResource } from "./base.js";
export class IncomingInvoicesResource extends BaseResource {
    /** Add a new incoming invoice */
    add(params) {
        return this.client.request("/incomingInvoices.add", params);
    }
    /** Get details for a single incoming invoice */
    info(params) {
        return this.client.request("/incomingInvoices.info", params);
    }
    /** Update an existing incoming invoice */
    update(params) {
        return this.client.request("/incomingInvoices.update", params);
    }
    /** Delete an incoming invoice */
    delete(params) {
        return this.client.request("/incomingInvoices.delete", params);
    }
    /** Approve an incoming invoice */
    approve(params) {
        return this.client.request("/incomingInvoices.approve", params);
    }
    /** Refuse an incoming invoice */
    refuse(params) {
        return this.client.request("/incomingInvoices.refuse", params);
    }
    /** Mark an incoming invoice as pending review */
    markAsPendingReview(params) {
        return this.client.request("/incomingInvoices.markAsPendingReview", params);
    }
    /** Send an incoming invoice to bookkeeping */
    sendToBookkeeping(params) {
        return this.client.request("/incomingInvoices.sendToBookkeeping", params);
    }
    /** Get a list of payments for an incoming invoice */
    listPayments(params) {
        return this.client.request("/incomingInvoices.listPayments", params);
    }
    /** Register a payment for an incoming invoice */
    registerPayment(params) {
        return this.client.request("/incomingInvoices.registerPayment", params);
    }
    /** Remove a payment from an incoming invoice */
    removePayment(params) {
        return this.client.request("/incomingInvoices.removePayment", params);
    }
    /** Update a payment on an incoming invoice */
    updatePayment(params) {
        return this.client.request("/incomingInvoices.updatePayment", params);
    }
}
//# sourceMappingURL=incoming-invoices.js.map