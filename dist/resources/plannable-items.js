import { BaseResource } from "./base.js";
export class PlannableItemsResource extends BaseResource {
    list(params) {
        return this.client.request("/plannableItems.list", params);
    }
    info(params) {
        return this.client.request("/plannableItems.info", params);
    }
}
//# sourceMappingURL=plannable-items.js.map