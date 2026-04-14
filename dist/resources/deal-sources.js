import { BaseResource } from "./base.js";
export class DealSourcesResource extends BaseResource {
    /** Iterate all dealSources — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/dealSources.list", params, options);
    }
}
//# sourceMappingURL=deal-sources.js.map