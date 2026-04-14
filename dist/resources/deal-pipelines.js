import { BaseResource } from "./base.js";
export class DealPipelinesResource extends BaseResource {
    /** Iterate all dealPipelines — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/dealPipelines.list", params, options);
    }
    /** Create a new deal pipeline */
    create(params) {
        return this.client.request("/dealPipelines.create", params);
    }
    /** Update an existing deal pipeline */
    update(params) {
        return this.client.request("/dealPipelines.update", params);
    }
    /** Mark a deal pipeline as default */
    markAsDefault(params) {
        return this.client.request("/dealPipelines.markAsDefault", params);
    }
    /** Duplicate a deal pipeline */
    duplicate(params) {
        return this.client.request("/dealPipelines.duplicate", params);
    }
    /** Delete a deal pipeline */
    delete(params) {
        return this.client.request("/dealPipelines.delete", params);
    }
}
//# sourceMappingURL=deal-pipelines.js.map