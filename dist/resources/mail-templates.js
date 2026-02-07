import { BaseResource } from "./base.js";
export class MailTemplatesResource extends BaseResource {
    list(params) {
        return this.client.request("/mailTemplates.list", params);
    }
}
//# sourceMappingURL=mail-templates.js.map