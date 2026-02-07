import { BaseResource } from "./base.js";
export class ProductCategoriesResource extends BaseResource {
    list(params) {
        return this.client.request("/productCategories.list", params);
    }
}
//# sourceMappingURL=product-categories.js.map