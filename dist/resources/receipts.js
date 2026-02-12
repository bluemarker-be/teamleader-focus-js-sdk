import { BaseResource } from "./base.js";
export class ReceiptsResource extends BaseResource {
    add(params) {
        return this.client.request("/receipts.add", params);
    }
    info(params) {
        return this.client.request("/receipts.info", params);
    }
    update(params) {
        return this.client.request("/receipts.update", params);
    }
    delete(params) {
        return this.client.request("/receipts.delete", params);
    }
    approve(params) {
        return this.client.request("/receipts.approve", params);
    }
    refuse(params) {
        return this.client.request("/receipts.refuse", params);
    }
    markAsPendingReview(params) {
        return this.client.request("/receipts.markAsPendingReview", params);
    }
    sendToBookkeeping(params) {
        return this.client.request("/receipts.sendToBookkeeping", params);
    }
    listPayments(params) {
        return this.client.request("/receipts.listPayments", params);
    }
    registerPayment(params) {
        return this.client.request("/receipts.registerPayment", params);
    }
    removePayment(params) {
        return this.client.request("/receipts.removePayment", params);
    }
    updatePayment(params) {
        return this.client.request("/receipts.updatePayment", params);
    }
}
//# sourceMappingURL=receipts.js.map