import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class BookkeepingSubmissionsResource extends BaseResource {
    list(params?: RequestBody<"bookkeepingSubmissions.list">): Promise<{
        data?: {
            id?: string;
            subject?: {
                id?: string;
                type?: "incoming_invoice" | "incoming_credit_note" | "receipt";
            };
            email_address?: string;
            status?: "sending" | "confirmed" | "failed";
            created_at?: string;
        }[];
    }>;
}
//# sourceMappingURL=bookkeeping-submissions.d.ts.map