import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class DocumentTemplatesResource extends BaseResource {
    /** Iterate all documentTemplates — auto-paginates across every page. */
    list(params: RequestBody<"documentTemplates.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        department?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
        document_type?: ("delivery_note" | "invoice" | "order" | "order_confirmation" | "quotation" | "timetracking_report" | "workorder") | undefined;
        is_default?: boolean | undefined;
        name?: string | undefined;
        status?: "active" | "archived" | undefined;
    }, void, undefined>;
}
//# sourceMappingURL=document-templates.d.ts.map