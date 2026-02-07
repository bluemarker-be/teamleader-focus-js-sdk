import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class ProductsResource extends BaseResource {
  /** Get a list of products */
  list(params?: RequestBody<"products.list">) {
    return this.client.request<ResponseBody<"products.list">>("/products.list", params);
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
