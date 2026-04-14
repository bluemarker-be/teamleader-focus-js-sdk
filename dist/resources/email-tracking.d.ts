import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class EmailTrackingResource extends BaseResource {
    /** Iterate all emailTracking — auto-paginates across every page. */
    list(params: RequestBody<"emailTracking.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        title?: string | undefined;
        content?: string | undefined;
        subject?: {
            id?: string | undefined;
            type: "company" | "contact" | "product" | "invoice" | "subscription" | "quotation" | "creditNote" | "deal" | "nextgenProject";
        } | undefined;
        added_at?: string | undefined;
        attachments?: {
            id?: string | undefined;
            type?: string | undefined;
        }[] | undefined;
    }, void, undefined>;
    create(params: RequestBody<"emailTracking.create">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
}
//# sourceMappingURL=email-tracking.d.ts.map