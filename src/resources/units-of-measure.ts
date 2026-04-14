import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class UnitsOfMeasureResource extends BaseResource {
  /** Iterate all unitsOfMeasure — auto-paginates across every page. */
  list(params?: RequestBody<"unitsOfMeasure.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"unitsOfMeasure.list">>("/unitsOfMeasure.list", params, options);
  }
}
