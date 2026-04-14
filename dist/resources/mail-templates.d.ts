import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class MailTemplatesResource extends BaseResource {
    /** Iterate all mailTemplates — auto-paginates across every page. */
    list(params: RequestBody<"mailTemplates.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
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
    }, void, undefined>;
}
//# sourceMappingURL=mail-templates.d.ts.map