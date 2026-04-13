import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class NotesResource extends BaseResource {
  /** Get a list of notes */
  list(params: RequestBody<"notes.list">) {
    return this.client.request<ResponseBody<"notes.list">>("/notes.list", params);
  }

  /** Create a new note */
  create(params: RequestBody<"notes.create">) {
    return this.client.request<ResponseBody<"notes.create">>("/notes.create", params);
  }

  /** Update an existing note */
  update(params: RequestBody<"notes.update">) {
    return this.client.request<void>("/notes.update", params);
  }
}
