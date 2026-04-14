import { BaseResource } from "./base.js";
export class ReceiptsResource extends BaseResource {
    /** Add a new receipt */
    add(params) {
        return this.client.request("/receipts.add", params);
    }
    /** Get details for a single receipt */
    info(params) {
        return this.client.request("/receipts.info", params);
    }
    /** Update an existing receipt */
    update(params) {
        return this.client.request("/receipts.update", params);
    }
    /** Delete a receipt */
    delete(params) {
        return this.client.request("/receipts.delete", params);
    }
    /** Approve a receipt */
    approve(params) {
        return this.client.request("/receipts.approve", params);
    }
    /** Refuse a receipt */
    refuse(params) {
        return this.client.request("/receipts.refuse", params);
    }
    /** Mark a receipt as pending review */
    markAsPendingReview(params) {
        return this.client.request("/receipts.markAsPendingReview", params);
    }
    /** Send a receipt to bookkeeping */
    sendToBookkeeping(params) {
        return this.client.request("/receipts.sendToBookkeeping", params);
    }
    /** Get a list of payments for a receipt */
    listPayments(params) {
        return this.client.request("/receipts.listPayments", params);
    }
    /** Register a payment for a receipt */
    registerPayment(params) {
        return this.client.request("/receipts.registerPayment", params);
    }
    /** Remove a payment from a receipt */
    removePayment(params) {
        return this.client.request("/receipts.removePayment", params);
    }
    /** Update a payment on a receipt */
    updatePayment(params) {
        return this.client.request("/receipts.updatePayment", params);
    }
}
//# sourceMappingURL=receipts.js.map