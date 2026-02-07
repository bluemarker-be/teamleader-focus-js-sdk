import { BaseResource } from "./base.js";
export class FilesResource extends BaseResource {
    list(params) {
        return this.client.request("/files.list", params);
    }
    info(params) {
        return this.client.request("/files.info", params);
    }
    upload(params) {
        return this.client.request("/files.upload", params);
    }
    download(params) {
        return this.client.request("/files.download", params);
    }
    delete(params) {
        return this.client.request("/files.delete", params);
    }
}
//# sourceMappingURL=files.js.map