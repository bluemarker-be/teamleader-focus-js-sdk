import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class UnitsOfMeasureResource extends BaseResource {
  /** Get a list of units of measure */
  list(params?: RequestBody<"unitsOfMeasure.list">) {
    return this.client.request<ResponseBody<"unitsOfMeasure.list">>("/unitsOfMeasure.list", params);
  }
}
