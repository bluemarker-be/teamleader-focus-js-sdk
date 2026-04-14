import { BaseResource } from "./base.js";
export class CustomFieldDefinitionsResource extends BaseResource {
    /** Create a new custom field definition */
    create(params) {
        return this.client.request("/customFieldDefinitions.create", params);
    }
    /** Iterate all customFieldDefinitions — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/customFieldDefinitions.list", params, options);
    }
    /** Get details for a single custom field definition */
    info(params) {
        return this.client.request("/customFieldDefinitions.info", params);
    }
}
//# sourceMappingURL=custom-field-definitions.js.map