import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class CallsResource extends BaseResource {
    /** Get a list of calls */
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
    /** Get details for a single call */
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
    /** Log a new call */
    add(params: RequestBody<"calls.add">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Update an existing call */
    update(params: RequestBody<"calls.update">): Promise<void>;
    /** Mark a call as complete */
    complete(params: RequestBody<"calls.complete">): Promise<void>;
}
//# sourceMappingURL=calls.d.ts.map