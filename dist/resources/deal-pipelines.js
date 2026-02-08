import { BaseResource } from "./base.js";
export class DealPipelinesResource extends BaseResource {
    /** Get a list of deal pipelines */
    list(params) {
        return this.client.request("/dealPipelines.list", params);
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