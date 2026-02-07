import { BaseResource } from "./base.js";
export class ContactsResource extends BaseResource {
    /** Get a list of contacts */
    list(params) {
        return this.client.request("/contacts.list", params);
    }
    /** Get details for a single contact */
    info(params) {
        return this.client.request("/contacts.info", params);
    }
    /** Create a new contact */
    add(params) {
        return this.client.request("/contacts.add", params);
    }
    /** Update an existing contact */
    update(params) {
        return this.client.request("/contacts.update", params);
    }
    /** Delete a contact */
    delete(params) {
        return this.client.request("/contacts.delete", params);
    }
    /** Add tags to a contact */
    tag(params) {
        return this.client.request("/contacts.tag", params);
    }
    /** Remove tags from a contact */
    untag(params) {
        return this.client.request("/contacts.untag", params);
    }
    /** Link a contact to a company */
    linkToCompany(params) {
        return this.client.request("/contacts.linkToCompany", params);
    }
    /** Unlink a contact from a company */
    unlinkFromCompany(params) {
        return this.client.request("/contacts.unlinkFromCompany", params);
    }
    /** Update the link between a contact and a company */
    updateCompanyLink(params) {
        return this.client.request("/contacts.updateCompanyLink", params);
    }
}
//# sourceMappingURL=contacts.js.map