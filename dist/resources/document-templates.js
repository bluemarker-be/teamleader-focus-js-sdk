import { BaseResource } from "./base.js";
export class DocumentTemplatesResource extends BaseResource {
    /** Iterate all documentTemplates — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/documentTemplates.list", params, options);
    }
}
//# sourceMappingURL=document-templates.js.map