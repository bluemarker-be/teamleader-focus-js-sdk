import { BaseResource } from "./base.js";
export class CompaniesResource extends BaseResource {
    /** Iterate all companies — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/companies.list", params, options);
    }
    /** Get details for a single company */
    info(params) {
        return this.client.request("/companies.info", params);
    }
    /** Create a new company */
    add(params) {
        return this.client.request("/companies.add", params);
    }
    /** Update an existing company */
    update(params) {
        return this.client.request("/companies.update", params);
    }
    /** Delete a company */
    delete(params) {
        return this.client.request("/companies.delete", params);
    }
    /** Add tags to a company */
    tag(params) {
        return this.client.request("/companies.tag", params);
    }
    /** Remove tags from a company */
    untag(params) {
        return this.client.request("/companies.untag", params);
    }
    /** Upload or remove a company's logo (base64-encoded image or null) */
    uploadLogo(params) {
        return this.client.request("/companies.uploadLogo", params);
    }
}
//# sourceMappingURL=companies.js.map