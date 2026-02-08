import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class MeetingsResource extends BaseResource {
  list(params?: RequestBody<"meetings.list">) {
    return this.client.request<ResponseBody<"meetings.list">>("/meetings.list", params);
  }

  info(params: RequestBody<"meetings.info">) {
    return this.client.request<ResponseBody<"meetings.info">>("/meetings.info", params);
  }

  schedule(params: RequestBody<"meetings.schedule">) {
    return this.client.request<ResponseBody<"meetings.schedule">>("/meetings.schedule", params);
  }

  update(params: RequestBody<"meetings.update">) {
    return this.client.request<void>("/meetings.update", params);
  }

  complete(params: RequestBody<"meetings.complete">) {
    return this.client.request<void>("/meetings.complete", params);
  }

  createReport(params: RequestBody<"meetings.createReport">) {
    return this.client.request<ResponseBody<"meetings.createReport">>("/meetings.createReport", params);
  }

  delete(params: RequestBody<"meetings.delete">) {
    return this.client.request<void>("/meetings.delete", params);
  }
}
