import { BaseResource } from "./base.js";
export class DealSourcesResource extends BaseResource {
    list(params) {
        return this.client.request("/dealSources.list", params);
    }
}
//# sourceMappingURL=deal-sources.js.map