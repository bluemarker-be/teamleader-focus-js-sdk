import { BaseResource } from "./base.js";
export class TagsResource extends BaseResource {
    /** Iterate all tags — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/tags.list", params, options);
    }
}
//# sourceMappingURL=tags.js.map