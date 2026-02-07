import { BaseResource } from "./base.js";
export class QuotationsResource extends BaseResource {
    /** Get a list of quotations */
    list(params) {
        return this.client.request("/quotations.list", params);
    }
    /** Get details for a single quotation */
    info(params) {
        return this.client.request("/quotations.info", params);
    }
    /** Download a quotation PDF */
    download(params) {
        return this.client.request("/quotations.download", params);
    }
    /** Create a new quotation */
    create(params) {
        return this.client.request("/quotations.create", params);
    }
    /** Send a quotation via email */
    send(params) {
        return this.client.request("/quotations.send", params);
    }
    /** Update an existing quotation */
    update(params) {
        return this.client.request("/quotations.update", params);
    }
    /** Accept a quotation */
    accept(params) {
        return this.client.request("/quotations.accept", params);
    }
    /** Delete a quotation */
    delete(params) {
        return this.client.request("/quotations.delete", params);
    }
}
//# sourceMappingURL=quotations.js.map