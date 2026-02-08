import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class CallsResource extends BaseResource {
    list(params?: RequestBody<"calls.list">): Promise<{
        data?: {
            id?: string | undefined;
            added_at?: string | null | undefined;
            participant?: {
                customer?: {
                    id?: string | undefined;
                    type?: string | undefined;
                } | null | undefined;
                contact?: {
                    id?: string | undefined;
                    type?: string | undefined;
                } | null | undefined;
            } | null | undefined;
            description?: string | null | undefined;
            outcome?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            outcome_summary?: string | null | undefined;
            assignee?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            scheduled_at?: string | undefined;
            status?: "open" | "completed" | undefined;
            deal?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
        }[] | undefined;
        meta?: {
            page?: {
                size?: number | undefined;
                number?: number | undefined;
            } | undefined;
            matches?: number | undefined;
        } | undefined;
    }>;
    info(params: RequestBody<"calls.info">): Promise<{
        data?: {
            id?: string | undefined;
            added_at?: string | null | undefined;
            completed_at?: string | null | undefined;
            participant?: {
                customer?: {
                    id?: string | undefined;
                    type?: string | undefined;
                } | null | undefined;
                contact?: {
                    id?: string | undefined;
                    type?: string | undefined;
                } | null | undefined;
            } | null | undefined;
            description?: string | null | undefined;
            outcome?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            outcome_summary?: string | null | undefined;
            assignee?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            scheduled_at?: string | undefined;
            status?: "open" | "completed" | undefined;
            deal?: {
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
        } | undefined;
    }>;
    add(params: RequestBody<"calls.add">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    update(params: RequestBody<"calls.update">): Promise<void>;
    complete(params: RequestBody<"calls.complete">): Promise<void>;
}
//# sourceMappingURL=calls.d.ts.map