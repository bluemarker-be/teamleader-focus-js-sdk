import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class EmailTrackingResource extends BaseResource {
    list(params: RequestBody<"emailTracking.list">): Promise<{
        data?: {
            id?: string | undefined;
            title?: string | undefined;
            content?: string | undefined;
            subject?: {
                id?: string | undefined;
                type: "company" | "contact" | "product" | "deal" | "invoice" | "subscription" | "quotation" | "creditNote" | "nextgenProject";
            } | undefined;
            added_at?: string | undefined;
            attachments?: {
                id?: string | undefined;
                type?: string | undefined;
            }[] | undefined;
        }[] | undefined;
    }>;
    create(params: RequestBody<"emailTracking.create">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
}
//# sourceMappingURL=email-tracking.d.ts.map