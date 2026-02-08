import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class DocumentTemplatesResource extends BaseResource {
    list(params: RequestBody<"documentTemplates.list">): Promise<{
        data?: {
            id?: string | undefined;
            department?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            document_type?: (("delivery_note" | "invoice" | "order" | "order_confirmation" | "quotation" | "timetracking_report" | "workorder") & unknown) | undefined;
            is_default?: boolean | undefined;
            name?: string | undefined;
            status?: "active" | "archived" | undefined;
        }[] | undefined;
    }>;
}
//# sourceMappingURL=document-templates.d.ts.map