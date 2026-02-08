import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class MailTemplatesResource extends BaseResource {
    list(params?: RequestBody<"mailTemplates.list">): Promise<{
        data?: {
            id?: string | undefined;
            department?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            name?: string | undefined;
            content?: {
                subject?: string | undefined;
                body?: string | undefined;
            } | undefined;
            language?: string | undefined;
            type?: "invoice" | "quotation" | "work_order" | "credit_note" | undefined;
        }[] | undefined;
    }>;
}
//# sourceMappingURL=mail-templates.d.ts.map