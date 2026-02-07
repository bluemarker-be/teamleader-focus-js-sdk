import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class TasksResource extends BaseResource {
    list(params?: RequestBody<"tasks.list">): Promise<{
        data?: {
            id?: string;
            title?: string;
            description?: string;
            completed?: boolean;
            completed_at?: string | null;
            due_on?: string;
            added_at?: string | null;
            estimated_duration?: {
                unit?: "min";
                value?: number;
            };
            work_type?: {
                id?: string;
                type?: string;
            } | null;
            assignee?: ({
                type?: string;
                id?: string;
            } & {
                type?: "team" | "user";
            }) | null;
            customer?: {
                type: "contact" | "company";
                id: string;
            } | null;
            milestone?: {
                id?: string;
                type?: string;
            } | null;
            deal?: {
                id?: string;
                type?: string;
            } | null;
            project?: {
                id?: string;
                type?: string;
            } | null;
            ticket?: ({
                id?: string;
                type?: string;
            } & {
                type?: unknown;
            }) | null;
            priority?: "A" | "B" | "C" | "D";
        }[];
    }>;
    info(params: RequestBody<"tasks.info">): Promise<{
        data?: {
            id?: string;
            title?: string;
            description?: string;
            completed?: boolean;
            completed_at?: string | null;
            due_on?: string;
            estimated_duration?: {
                unit?: "min";
                value?: number;
            };
            work_type?: {
                id?: string;
                type?: string;
            } | null;
            assignee?: ({
                type?: string;
                id?: string;
            } & {
                type?: "team" | "user";
            }) | null;
            customer?: {
                type: "contact" | "company";
                id: string;
            } | null;
            milestone?: {
                id?: string;
                type?: string;
            } | null;
            deal?: {
                id?: string;
                type?: string;
            } | null;
            project?: {
                id?: string;
                type?: string;
            } | null;
            ticket?: ({
                id?: string;
                type?: string;
            } & {
                type?: unknown;
            }) | null;
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
            priority?: "A" | "B" | "C" | "D";
        };
    }>;
    create(params: RequestBody<"tasks.create">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
    update(params: RequestBody<"tasks.update">): Promise<void>;
    complete(params: RequestBody<"tasks.complete">): Promise<void>;
    reopen(params: RequestBody<"tasks.reopen">): Promise<void>;
    schedule(params: RequestBody<"tasks.schedule">): Promise<void>;
    delete(params: RequestBody<"tasks.delete">): Promise<void>;
}
//# sourceMappingURL=tasks.d.ts.map