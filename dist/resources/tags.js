import { BaseResource } from "./base.js";
export class TagsResource extends BaseResource {
    list(params) {
        return this.client.request("/tags.list", params);
    }
}
//# sourceMappingURL=tags.js.map