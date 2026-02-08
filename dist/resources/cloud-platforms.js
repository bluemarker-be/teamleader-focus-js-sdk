import { BaseResource } from "./base.js";
export class CloudPlatformsResource extends BaseResource {
    /** Get the cloud platform URL */
    url(params) {
        return this.client.request("/cloudPlatforms.url", params);
    }
}
//# sourceMappingURL=cloud-platforms.js.map