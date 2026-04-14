import { BaseResource } from "./base.js";
export class BookkeepingSubmissionsResource extends BaseResource {
    /** Iterate all bookkeepingSubmissions — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/bookkeepingSubmissions.list", params, options);
    }
}
//# sourceMappingURL=bookkeeping-submissions.js.map