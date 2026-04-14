import { BaseResource } from "./base.js";
export class NotesResource extends BaseResource {
    /** Get a list of notes */
    list(params) {
        return this.client.request("/notes.list", params);
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