import { BaseResource } from "./base.js";
export class InvoicesResource extends BaseResource {
    /** Get a list of invoices */
    list(params) {
        return this.client.request("/invoices.list", params);
    }
    /** Get details for a single invoice */
    info(params) {
        return this.client.request("/invoices.info", params);
    }
    /** Download an invoice PDF */
    download(params) {
        return this.client.request("/invoices.download", params);
    }
    /** Create a draft invoice */
    draft(params) {
        return this.client.request("/invoices.draft", params);
    }
    /** Update a draft invoice */
    update(params) {
        return this.client.request("/invoices.update", params);
    }
    /** Update a booked invoice */
    updateBooked(params) {
        return this.client.request("/invoices.updateBooked", params);
    }
    /** Copy an invoice */
    copy(params) {
        return this.client.request("/invoices.copy", params);
    }
    /** Book a draft invoice */
    book(params) {
        return this.client.request("/invoices.book", params);
    }
    /** Delete a draft invoice */
    delete(params) {
        return this.client.request("/invoices.delete", params);
    }
    /** Register a payment for an invoice */
    registerPayment(params) {
        return this.client.request("/invoices.registerPayment", params);
    }
    /** Remove payments from an invoice */
    removePayments(params) {
        return this.client.request("/invoices.removePayments", params);
    }
    /** Credit a full invoice */
    credit(params) {
        return this.client.request("/invoices.credit", params);
    }
    /** Partially credit an invoice */
    creditPartially(params) {
        return this.client.request("/invoices.creditPartially", params);
    }
    /** Send an invoice via email */
    send(params) {
        return this.client.request("/invoices.send", params);
    }
}
//# sourceMappingURL=invoices.js.map