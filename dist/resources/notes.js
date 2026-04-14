import { BaseResource } from "./base.js";
export class NotesResource extends BaseResource {
    /** Iterate all notes — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/notes.list", params, options);
    }
    /** Create a new note */
    create(params) {
        return this.client.request("/notes.create", params);
    }
    /** Update an existing note */
    update(params) {
        return this.client.request("/notes.update", params);
    }
}
//# sourceMappingURL=notes.js.map