import { BaseResource } from "./base.js";
export class ProductCategoriesResource extends BaseResource {
    /** Iterate all productCategories — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/productCategories.list", params, options);
    }
}
//# sourceMappingURL=product-categories.js.map