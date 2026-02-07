import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class ProductCategoriesResource extends BaseResource {
  list(params?: RequestBody<"productCategories.list">) {
    return this.client.request<ResponseBody<"productCategories.list">>("/productCategories.list", params);
  }
}
