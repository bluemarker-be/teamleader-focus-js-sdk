import { BaseResource } from "./base.js";
export class BookkeepingSubmissionsResource extends BaseResource {
    list(params) {
        return this.client.request("/bookkeepingSubmissions.list", params);
    }
}
//# sourceMappingURL=bookkeeping-submissions.js.map