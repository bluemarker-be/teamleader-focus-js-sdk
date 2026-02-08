import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class TicketStatusResource extends BaseResource {
    list(params?: RequestBody<"ticketStatus.list">): Promise<{
        data?: {
            id?: string | undefined;
            status?: "new" | "open" | "waiting_for_client" | "escalated_thirdparty" | "closed" | "custom" | undefined;
            label?: string | undefined;
        }[] | undefined;
    }>;
}
//# sourceMappingURL=ticket-status.d.ts.map