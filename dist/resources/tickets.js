import { BaseResource } from "./base.js";
export class TicketsResource extends BaseResource {
    /** Get a list of tickets */
    list(params) {
        return this.client.request("/tickets.list", params);
    }
    /** Get details for a single ticket */
    info(params) {
        return this.client.request("/tickets.info", params);
    }
    /** Create a new ticket */
    create(params) {
        return this.client.request("/tickets.create", params);
    }
    /** Update an existing ticket */
    update(params) {
        return this.client.request("/tickets.update", params);
    }
    /** Get a list of messages for a ticket */
    listMessages(params) {
        return this.client.request("/tickets.listMessages", params);
    }
    /** Get a single message from a ticket */
    getMessage(params) {
        return this.client.request("/tickets.getMessage", params);
    }
    /** Add a reply to a ticket */
    addReply(params) {
        return this.client.request("/tickets.addReply", params);
    }
    /** Add an internal message to a ticket */
    addInternalMessage(params) {
        return this.client.request("/tickets.addInternalMessage", params);
    }
    /** Import an external message into a ticket */
    importMessage(params) {
        return this.client.request("/tickets.importMessage", params);
    }
}
//# sourceMappingURL=tickets.js.map