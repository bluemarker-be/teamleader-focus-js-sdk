import { BaseResource } from "./base.js";
export class TicketStatusResource extends BaseResource {
    /** Iterate all ticketStatus — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/ticketStatus.list", params, options);
    }
}
//# sourceMappingURL=ticket-status.js.map