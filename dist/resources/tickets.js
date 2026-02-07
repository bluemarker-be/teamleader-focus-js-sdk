import { BaseResource } from "./base.js";
export class TicketsResource extends BaseResource {
    list(params) {
        return this.client.request("/tickets.list", params);
    }
    info(params) {
        return this.client.request("/tickets.info", params);
    }
    create(params) {
        return this.client.request("/tickets.create", params);
    }
    update(params) {
        return this.client.request("/tickets.update", params);
    }
    listMessages(params) {
        return this.client.request("/tickets.listMessages", params);
    }
    getMessage(params) {
        return this.client.request("/tickets.getMessage", params);
    }
    addReply(params) {
        return this.client.request("/tickets.addReply", params);
    }
    addInternalMessage(params) {
        return this.client.request("/tickets.addInternalMessage", params);
    }
    importMessage(params) {
        return this.client.request("/tickets.importMessage", params);
    }
}
//# sourceMappingURL=tickets.js.map