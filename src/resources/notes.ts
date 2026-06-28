import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class NotesResource extends BaseResource {
  /** Iterate all notes — auto-paginates across every page. */
  list(params: RequestBody<"notes.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"notes.list">>("/notes.list", params, options);
  }

  /** Create a new note */
  create(params: RequestBody<"notes.create">) {
    return this.client.request<ResponseBody<"notes.create">>("/notes.create", params);
  }

  /** Update an existing note */
  update(params: RequestBody<"notes.update">) {
    return this.client.request<void>("/notes.update", params);
  }

  delete(params: RequestBody<"notes.delete">) {
    return this.client.request<void>("/notes.delete", params);
  }
}
