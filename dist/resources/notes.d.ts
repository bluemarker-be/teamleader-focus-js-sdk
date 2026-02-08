import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class NotesResource extends BaseResource {
    list(params: RequestBody<"notes.list">): Promise<{
        data?: {
            id?: string | undefined;
            content?: string | undefined;
            subject?: {
                id?: string | undefined;
                type?: "company" | "contact" | "product" | "deal" | "project" | "invoice" | "subscription" | "quotation" | "creditNote" | "nextgenProject" | undefined;
            } | undefined;
            added_at?: string | undefined;
        }[] | undefined;
    }>;
    create(params: RequestBody<"notes.create">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    update(params: RequestBody<"notes.update">): Promise<void>;
}
//# sourceMappingURL=notes.d.ts.map