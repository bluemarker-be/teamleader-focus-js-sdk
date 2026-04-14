import { BaseResource } from "./base.js";
export class MailTemplatesResource extends BaseResource {
    /** Get a list of mail templates */
    list(params) {
        return this.client.request("/mailTemplates.list", params);
    }
}
//# sourceMappingURL=mail-templates.js.map