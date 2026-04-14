import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class ProductsResource extends BaseResource {
  /** Iterate all products — auto-paginates across every page. */
  list(params?: RequestBody<"products.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"products.list">>("/products.list", params, options);
  }

  /** Get details for a single product */
  info(params: RequestBody<"products.info">) {
    return this.client.request<ResponseBody<"products.info">>("/products.info", params);
  }

  /** Create a new product */
  add(params: RequestBody<"products.add">) {
    return this.client.request<ResponseBody<"products.add">>("/products.add", params);
  }

  /** Update an existing product */
  update(params: RequestBody<"products.update">) {
    return this.client.request<void>("/products.update", params);
  }

  /** Delete a product */
  delete(params: RequestBody<"products.delete">) {
    return this.client.request<void>("/products.delete", params);
  }
}
