import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class TasksResource extends BaseResource {
    list(params?: RequestBody<"tasks.list">): Promise<{
        data?: {
            id?: string | undefined;
            title?: string | undefined;
            description?: string | undefined;
            completed?: boolean | undefined;
            completed_at?: string | null | undefined;
            due_on?: string | undefined;
            added_at?: string | null | undefined;
            estimated_duration?: {
                unit?: "min" | undefined;
                value?: number | undefined;
            } | undefined;
            work_type?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            assignee?: {
                type?: "user" | "team" | undefined;
                id?: string | undefined;
            } | null | undefined;
            customer?: {
                type: "contact" | "company";
                id: string;
            } | null | undefined;
            milestone?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            deal?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            project?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            ticket?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            priority?: "A" | "B" | "C" | "D" | undefined;
        }[] | undefined;
    }>;
    info(params: RequestBody<"tasks.info">): Promise<{
        data?: {
            id?: string | undefined;
            title?: string | undefined;
            description?: string | undefined;
            completed?: boolean | undefined;
            completed_at?: string | null | undefined;
            due_on?: string | undefined;
            estimated_duration?: {
                unit?: "min" | undefined;
                value?: number | undefined;
            } | undefined;
            work_type?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            assignee?: {
                type?: "user" | "team" | undefined;
                id?: string | undefined;
            } | null | undefined;
            customer?: {
                type: "contact" | "company";
                id: string;
            } | null | undefined;
            milestone?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            deal?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            project?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            ticket?: {
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
            priority?: "A" | "B" | "C" | "D" | undefined;
        } | undefined;
    }>;
    create(params: RequestBody<"tasks.create">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    update(params: RequestBody<"tasks.update">): Promise<void>;
    complete(params: RequestBody<"tasks.complete">): Promise<void>;
    reopen(params: RequestBody<"tasks.reopen">): Promise<void>;
    schedule(params: RequestBody<"tasks.schedule">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    delete(params: RequestBody<"tasks.delete">): Promise<void>;
}
//# sourceMappingURL=tasks.d.ts.map