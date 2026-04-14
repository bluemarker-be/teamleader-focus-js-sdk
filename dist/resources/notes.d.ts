import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class NotesResource extends BaseResource {
    /** Get a list of notes */
    list(params: RequestBody<"notes.list">): Promise<{
        data?: {
            id?: string | undefined;
            content?: string | undefined;
            subject?: {
                id?: string | undefined;
                type?: "company" | "contact" | "product" | "project" | "invoice" | "subscription" | "meeting" | "quotation" | "creditNote" | "deal" | "nextgenProject" | undefined;
            } | undefined;
            added_at?: string | undefined;
        }[] | undefined;
    }>;
    /** Create a new note */
    create(params: RequestBody<"notes.create">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Update an existing note */
    update(params: RequestBody<"notes.update">): Promise<void>;
}
//# sourceMappingURL=notes.d.ts.map