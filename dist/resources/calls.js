import { BaseResource } from "./base.js";
export class CallsResource extends BaseResource {
    list(params) {
        return this.client.request("/calls.list", params);
    }
    info(params) {
        return this.client.request("/calls.info", params);
    }
    add(params) {
        return this.client.request("/calls.add", params);
    }
    update(params) {
        return this.client.request("/calls.update", params);
    }
    complete(params) {
        return this.client.request("/calls.complete", params);
    }
}
//# sourceMappingURL=calls.js.map