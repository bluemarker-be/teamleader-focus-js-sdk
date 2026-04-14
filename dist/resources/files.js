import { BaseResource } from "./base.js";
export class FilesResource extends BaseResource {
    /** Iterate all files — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/files.list", params, options);
    }
    /** Get details for a single file */
    info(params) {
        return this.client.request("/files.info", params);
    }
    /** Upload a file */
    upload(params) {
        return this.client.request("/files.upload", params);
    }
    /** Download a file */
    download(params) {
        return this.client.request("/files.download", params);
    }
    /** Delete a file */
    delete(params) {
        return this.client.request("/files.delete", params);
    }
}
//# sourceMappingURL=files.js.map