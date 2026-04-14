import { BaseResource } from "./base.js";
export class MailTemplatesResource extends BaseResource {
    /** Iterate all mailTemplates — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/mailTemplates.list", params, options);
    }
}
//# sourceMappingURL=mail-templates.js.map