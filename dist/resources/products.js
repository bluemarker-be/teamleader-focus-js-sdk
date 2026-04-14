import { BaseResource } from "./base.js";
export class ProductsResource extends BaseResource {
    /** Iterate all products — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/products.list", params, options);
    }
    /** Get details for a single product */
    info(params) {
        return this.client.request("/products.info", params);
    }
    /** Create a new product */
    add(params) {
        return this.client.request("/products.add", params);
    }
    /** Update an existing product */
    update(params) {
        return this.client.request("/products.update", params);
    }
    /** Delete a product */
    delete(params) {
        return this.client.request("/products.delete", params);
    }
}
//# sourceMappingURL=products.js.map