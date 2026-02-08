import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class LevelTwoAreasResource extends BaseResource {
  /** Get a list of level two areas */
  list(params?: RequestBody<"levelTwoAreas.list">) {
    return this.client.request<ResponseBody<"levelTwoAreas.list">>("/levelTwoAreas.list", params);
  }
}
