import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class TeamsResource extends BaseResource {
  list(params?: RequestBody<"teams.list">) {
    return this.client.request<ResponseBody<"teams.list">>("/teams.list", params);
  }
}
