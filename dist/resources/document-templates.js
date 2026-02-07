import { BaseResource } from "./base.js";
export class DocumentTemplatesResource extends BaseResource {
    list(params) {
        return this.client.request("/documentTemplates.list", params);
    }
}
//# sourceMappingURL=document-templates.js.map