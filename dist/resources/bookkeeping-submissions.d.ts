import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class BookkeepingSubmissionsResource extends BaseResource {
    /** Iterate all bookkeepingSubmissions — auto-paginates across every page. */
    list(params?: RequestBody<"bookkeepingSubmissions.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        subject?: {
            id?: string | undefined;
            type?: "incomingInvoice" | "incomingCreditNote" | "receipt" | undefined;
        } | undefined;
        email_address?: string | undefined;
        status?: "sending" | "confirmed" | "failed" | undefined;
        created_at?: string | undefined;
    }, void, undefined>;
}
//# sourceMappingURL=bookkeeping-submissions.d.ts.map