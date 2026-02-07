import { BaseResource } from "./base.js";
export class TicketStatusResource extends BaseResource {
    list(params) {
        return this.client.request("/ticketStatus.list", params);
    }
}
//# sourceMappingURL=ticket-status.js.map