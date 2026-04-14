import { BaseResource } from "./base.js";
export class CallsResource extends BaseResource {
    /** Iterate all calls — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/calls.list", params, options);
    }
    /** Get details for a single call */
    info(params) {
        return this.client.request("/calls.info", params);
    }
    /** Log a new call */
    add(params) {
        return this.client.request("/calls.add", params);
    }
    /** Update an existing call */
    update(params) {
        return this.client.request("/calls.update", params);
    }
    /** Mark a call as complete */
    complete(params) {
        return this.client.request("/calls.complete", params);
    }
}
//# sourceMappingURL=calls.js.map