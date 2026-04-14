import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class TicketStatusResource extends BaseResource {
    /** Iterate all ticketStatus — auto-paginates across every page. */
    list(params?: RequestBody<"ticketStatus.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        status?: "new" | "open" | "waiting_for_client" | "escalated_thirdparty" | "closed" | "custom" | undefined;
        label?: string | undefined;
    }, void, undefined>;
}
//# sourceMappingURL=ticket-status.d.ts.map