import { BaseResource } from "./base.js";
export class NotesResource extends BaseResource {
    list(params) {
        return this.client.request("/notes.list", params);
    }
    create(params) {
        return this.client.request("/notes.create", params);
    }
    update(params) {
        return this.client.request("/notes.update", params);
    }
}
//# sourceMappingURL=notes.js.map