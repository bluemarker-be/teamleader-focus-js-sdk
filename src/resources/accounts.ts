import type { ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class AccountsResource extends BaseResource {
  /** Get the Projects v2 migration status for this account */
  projectsV2Status() {
    return this.client.request<ResponseBody<"accounts.projects-v2-status">>("/accounts.projects-v2-status");
  }
}
