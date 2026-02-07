import { BaseResource } from "./base.js";
export class CustomFieldDefinitionsResource extends BaseResource {
    create(params) {
        return this.client.request("/customFieldDefinitions.create", params);
    }
    list(params) {
        return this.client.request("/customFieldDefinitions.list", params);
    }
    info(params) {
        return this.client.request("/customFieldDefinitions.info", params);
    }
}
//# sourceMappingURL=custom-field-definitions.js.map