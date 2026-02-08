import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class BookkeepingSubmissionsResource extends BaseResource {
    list(params?: RequestBody<"bookkeepingSubmissions.list">): Promise<{
        data?: {
            id?: string | undefined;
            subject?: {
                id?: string | undefined;
                type?: "incoming_invoice" | "incoming_credit_note" | "receipt" | undefined;
            } | undefined;
            email_address?: string | undefined;
            status?: "sending" | "confirmed" | "failed" | undefined;
            created_at?: string | undefined;
        }[] | undefined;
    }>;
}
//# sourceMappingURL=bookkeeping-submissions.d.ts.map