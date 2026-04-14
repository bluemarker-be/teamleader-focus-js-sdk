import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class ProductCategoriesResource extends BaseResource {
  /** Iterate all productCategories — auto-paginates across every page. */
  list(params?: RequestBody<"productCategories.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"productCategories.list">>("/productCategories.list", params, options);
  }
}
