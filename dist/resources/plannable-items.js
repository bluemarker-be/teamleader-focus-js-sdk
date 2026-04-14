import { BaseResource } from "./base.js";
export class PlannableItemsResource extends BaseResource {
    /** Get a list of plannable items */
    list(params) {
        return this.client.request("/plannableItems.list", params);
    }
    /** Get details for a single plannable item */
    info(params) {
        return this.client.request("/plannableItems.info", params);
    }
}
//# sourceMappingURL=plannable-items.js.map