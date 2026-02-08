import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

/** Legacy milestones (pre-v2). Only available for accounts not yet migrated to Projects v2. */
export class LegacyMilestonesResource extends BaseResource {
  /** Get a list of milestones */
  list(params: RequestBody<"LegacyMilestones.list">) {
    return this.client.request<ResponseBody<"LegacyMilestones.list">>("/milestones.list", params);
  }

  /** Get details for a single milestone */
  info(params: RequestBody<"LegacyMilestones.info">) {
    return this.client.request<ResponseBody<"LegacyMilestones.info">>("/milestones.info", params);
  }

  /** Create a new milestone */
  create(params: RequestBody<"LegacyMilestones.create">) {
    return this.client.request<ResponseBody<"LegacyMilestones.create">>("/milestones.create", params);
  }

  /** Update an existing milestone */
  update(params: RequestBody<"LegacyMilestones.update">) {
    return this.client.request<void>("/milestones.update", params);
  }

  /** Delete a milestone */
  delete(params: RequestBody<"LegacyMilestones.delete">) {
    return this.client.request<void>("/milestones.delete", params);
  }

  /** Close a milestone */
  close(params: RequestBody<"LegacyMilestones.close">) {
    return this.client.request<void>("/milestones.close", params);
  }

  /** Open (reopen) a milestone */
  open(params: RequestBody<"LegacyMilestones.open">) {
    return this.client.request<void>("/milestones.open", params);
  }
}
