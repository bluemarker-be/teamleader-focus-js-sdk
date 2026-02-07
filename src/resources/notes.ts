import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class NotesResource extends BaseResource {
  list(params: RequestBody<"notes.list">) {
    return this.client.request<ResponseBody<"notes.list">>("/notes.list", params);
  }

  create(params: RequestBody<"notes.create">) {
    return this.client.request<ResponseBody<"notes.create">>("/notes.create", params);
  }

  update(params: RequestBody<"notes.update">) {
    return this.client.request<void>("/notes.update", params);
  }
}
