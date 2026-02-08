import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class TicketsResource extends BaseResource {
    list(params?: RequestBody<"tickets.list">): Promise<{
        data?: {
            id?: string | undefined;
            reference?: number | undefined;
            subject?: string | undefined;
            status?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            assignee?: {
                type?: string | undefined;
                id?: string | undefined;
            } | null | undefined;
            created_at?: string | undefined;
            closed_at?: string | null | undefined;
            customer?: {
                type: "contact" | "company";
                id: string;
            } | undefined;
            participant?: {
                customer?: {
                    id?: string | undefined;
                    type?: string | undefined;
                } | undefined;
            } | null | undefined;
            project?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            milestone?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            last_message_at?: string | null | undefined;
        }[] | undefined;
    }>;
    info(params: RequestBody<"tickets.info">): Promise<{
        id?: string | undefined;
        reference?: number | undefined;
        subject?: string | undefined;
        status?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
        assignee?: {
            type?: string | undefined;
            id?: string | undefined;
        } | null | undefined;
        created_at?: string | undefined;
        closed_at?: string | null | undefined;
        customer?: {
            type: "contact" | "company";
            id: string;
        } | undefined;
        participant?: {
            customer?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
        } | null | undefined;
        last_message_at?: string | null | undefined;
        description?: string | undefined;
        project?: {
            id?: string | undefined;
            type?: string | undefined;
        } | null | undefined;
        milestone?: {
            id?: string | undefined;
            type?: string | undefined;
        } | null | undefined;
        custom_fields?: {
            definition?: {
                type?: string | undefined;
                id?: string | undefined;
            } | undefined;
            value?: string | number | boolean | string[] | {
                id?: string | undefined;
                type?: "user" | "company" | "contact" | "product" | undefined;
            } | undefined;
        }[] | undefined;
    }>;
    create(params: RequestBody<"tickets.create">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    update(params: RequestBody<"tickets.update">): Promise<void>;
    listMessages(params: RequestBody<"tickets.listMessages">): Promise<{
        data?: {
            message_id?: string | undefined;
            body?: string | undefined;
            type?: "customer" | "internal" | "thirdParty" | undefined;
            created_at?: string | undefined;
            sent_by?: {
                type?: "company" | "contact" | "user" | undefined;
                id?: string | undefined;
            } | undefined;
            attachments?: {
                id?: string | undefined;
                type?: string | undefined;
            }[] | undefined;
        }[] | undefined;
        meta?: {
            page?: {
                size?: number | undefined;
                number?: number | undefined;
            } | undefined;
            matches?: number | undefined;
        } | undefined;
    }>;
    getMessage(params: RequestBody<"tickets.getMessage">): Promise<{
        message_id?: string | undefined;
        body?: string | undefined;
        raw_body?: string | undefined;
        created_at?: string | undefined;
        sent_by?: {
            type?: "company" | "contact" | "user" | undefined;
            id?: string | undefined;
        } | undefined;
        ticket?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
        attachments?: {
            id?: string | undefined;
            type?: string | undefined;
        }[] | undefined;
        type?: "customer" | "internal" | "thirdParty" | undefined;
    }>;
    addReply(params: RequestBody<"tickets.addReply">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    addInternalMessage(params: RequestBody<"tickets.addInternalMessage">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    importMessage(params: RequestBody<"tickets.importMessage">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
}
//# sourceMappingURL=tickets.d.ts.map