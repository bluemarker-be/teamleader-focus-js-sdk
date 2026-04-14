import { BaseResource } from "./base.js";
export class PlannableItemsResource extends BaseResource {
    /** Iterate all plannableItems — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/plannableItems.list", params, options);
    }
    /** Get details for a single plannable item */
    info(params) {
        return this.client.request("/plannableItems.info", params);
    }
}
//# sourceMappingURL=plannable-items.js.map