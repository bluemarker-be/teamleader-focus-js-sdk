import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class TicketsResource extends BaseResource {
    list(params?: RequestBody<"tickets.list">): Promise<{
        data?: {
            id?: string;
            reference?: number;
            subject?: string;
            status?: {
                id?: string;
                type?: string;
            };
            assignee?: {
                type?: string;
                id?: string;
            } | null;
            created_at?: string;
            closed_at?: string | null;
            customer?: {
                type: "contact" | "company";
                id: string;
            };
            participant?: {
                customer?: {
                    id?: string;
                    type?: string;
                };
            } | null;
            project?: {
                id?: string;
                type?: string;
            } | null;
            milestone?: {
                id?: string;
                type?: string;
            } | null;
            last_message_at?: string | null;
        }[];
    }>;
    info(params: RequestBody<"tickets.info">): Promise<{
        id?: string;
        reference?: number;
        subject?: string;
        status?: {
            id?: string;
            type?: string;
        };
        assignee?: {
            type?: string;
            id?: string;
        } | null;
        created_at?: string;
        closed_at?: string | null;
        customer?: {
            type: "contact" | "company";
            id: string;
        };
        participant?: {
            customer?: {
                id?: string;
                type?: string;
            };
        } | null;
        last_message_at?: string | null;
        description?: string;
        project?: {
            id?: string;
            type?: string;
        } | null;
        milestone?: {
            id?: string;
            type?: string;
        } | null;
        custom_fields?: {
            definition?: {
                type?: string;
                id?: string;
            };
            value?: string | number | string[] | boolean | ({
                id?: string;
                type?: string;
            } & {
                type?: "company" | "contact" | "product" | "user";
            });
        }[];
    }>;
    create(params: RequestBody<"tickets.create">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
    update(params: RequestBody<"tickets.update">): Promise<void>;
    listMessages(params: RequestBody<"tickets.listMessages">): Promise<{
        data?: {
            message_id?: string;
            body?: string;
            type?: "customer" | "internal" | "thirdParty";
            created_at?: string;
            sent_by?: {
                type?: "company" | "contact" | "user";
                id?: string;
            };
            attachments?: {
                id?: string;
                type?: string;
            }[];
        }[];
        meta?: {
            page?: {
                size?: number;
                number?: number;
            };
            matches?: number;
        } & unknown;
    }>;
    getMessage(params: RequestBody<"tickets.getMessage">): Promise<{
        message_id?: string;
        body?: string;
        raw_body?: string;
        created_at?: string;
        sent_by?: {
            type?: "company" | "contact" | "user";
            id?: string;
        };
        ticket?: {
            id?: string;
            type?: string;
        };
        attachments?: {
            id?: string;
            type?: string;
        }[];
        type?: "customer" | "internal" | "thirdParty";
    }>;
    addReply(params: RequestBody<"tickets.addReply">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
    addInternalMessage(params: RequestBody<"tickets.addInternalMessage">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
    importMessage(params: RequestBody<"tickets.importMessage">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
}
//# sourceMappingURL=tickets.d.ts.map