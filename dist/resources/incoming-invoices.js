import { BaseResource } from "./base.js";
export class IncomingInvoicesResource extends BaseResource {
    add(params) {
        return this.client.request("/incomingInvoices.add", params);
    }
    info(params) {
        return this.client.request("/incomingInvoices.info", params);
    }
    update(params) {
        return this.client.request("/incomingInvoices.update", params);
    }
    delete(params) {
        return this.client.request("/incomingInvoices.delete", params);
    }
    approve(params) {
        return this.client.request("/incomingInvoices.approve", params);
    }
    refuse(params) {
        return this.client.request("/incomingInvoices.refuse", params);
    }
    markAsPendingReview(params) {
        return this.client.request("/incomingInvoices.markAsPendingReview", params);
    }
    sendToBookkeeping(params) {
        return this.client.request("/incomingInvoices.sendToBookkeeping", params);
    }
}
//# sourceMappingURL=incoming-invoices.js.map