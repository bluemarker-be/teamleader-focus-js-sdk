import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class CallsResource extends BaseResource {
    list(params?: RequestBody<"calls.list">): Promise<{
        data?: {
            id?: string;
            added_at?: string | null;
            participant?: {
                customer?: {
                    id?: string;
                    type?: string;
                } | null;
                contact?: {
                    id?: string;
                    type?: string;
                } | null;
            } | null;
            description?: string | null;
            outcome?: {
                id?: string;
                type?: string;
            } | null;
            outcome_summary?: string | null;
            assignee?: {
                id?: string;
                type?: string;
            } | null;
            scheduled_at?: string;
            status?: "open" | "completed";
            deal?: {
                id?: string;
                type?: string;
            } | null;
        }[];
        meta?: {
            page?: {
                size?: number;
                number?: number;
            };
            matches?: number;
        } & unknown;
    }>;
    info(params: RequestBody<"calls.info">): Promise<{
        data?: {
            id?: string;
            added_at?: string | null;
            completed_at?: string | null;
            participant?: {
                customer?: {
                    id?: string;
                    type?: string;
                } | null;
                contact?: {
                    id?: string;
                    type?: string;
                } | null;
            } | null;
            description?: string | null;
            outcome?: {
                id?: string;
                type?: string;
            } | null;
            outcome_summary?: string | null;
            assignee?: {
                id?: string;
                type?: string;
            } | null;
            scheduled_at?: string;
            status?: "open" | "completed";
            deal?: {
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
        };
    }>;
    add(params: RequestBody<"calls.add">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
    update(params: RequestBody<"calls.update">): Promise<void>;
    complete(params: RequestBody<"calls.complete">): Promise<void>;
}
//# sourceMappingURL=calls.d.ts.map