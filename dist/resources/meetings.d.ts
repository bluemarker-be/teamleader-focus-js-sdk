import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class MeetingsResource extends BaseResource {
    list(params?: RequestBody<"meetings.list">): Promise<{
        data?: {
            id?: string | undefined;
            title?: string | undefined;
            description?: string | undefined;
            created_at?: string | undefined;
            created_by?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            scheduled_at?: string | undefined;
            duration?: {
                unit?: "min" | undefined;
                value?: number | undefined;
            } | undefined;
            tracked_time?: {
                total?: {
                    unit?: "min" | undefined;
                    value?: number | undefined;
                } | undefined;
            } | undefined;
            estimated_time?: {
                total?: {
                    unit?: "s" | undefined;
                    value?: number | undefined;
                } | undefined;
            } | undefined;
            customer?: {
                type: "contact" | "company";
                id: string;
            } | null | undefined;
            project?: {
                id?: string | undefined;
                type?: "project" | "nextgenProject" | undefined;
            } | null | undefined;
            milestone?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            group?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            attendees?: {
                type?: "user" | "contact" | undefined;
                id?: string | undefined;
            }[] | undefined;
            status?: "open" | "done" | undefined;
            recurrence?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
        }[] | undefined;
    }>;
    info(params: RequestBody<"meetings.info">): Promise<{
        data?: {
            id?: string | undefined;
            title?: string | undefined;
            description?: string | undefined;
            created_at?: string | undefined;
            created_by?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            scheduled_at?: string | undefined;
            duration?: {
                unit?: "min" | undefined;
                value?: number | undefined;
            } | undefined;
            tracked_time?: {
                total?: {
                    unit?: "min" | undefined;
                    value?: number | undefined;
                } | undefined;
            } | undefined;
            estimated_time?: {
                total?: {
                    unit?: "s" | undefined;
                    value?: number | undefined;
                } | undefined;
            } | undefined;
            customer?: {
                type: "contact" | "company";
                id: string;
            } | null | undefined;
            project?: {
                id?: string | undefined;
                type?: "project" | "nextgenProject" | undefined;
            } | null | undefined;
            milestone?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            group?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            deal?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            location?: {
                type?: "virtual" | "calendarResource" | undefined;
            } | {
                type?: "contact" | "company" | undefined;
                address?: {
                    line_1?: string | null | undefined;
                    postal_code?: string | null | undefined;
                    city?: string | null | undefined;
                    country?: string | undefined;
                    area_level_two?: {
                        id?: string | undefined;
                        type?: string | undefined;
                    } | null | undefined;
                } | undefined;
            } | {
                type?: string | undefined;
                id?: string | undefined;
                address?: {
                    line_1?: string | null | undefined;
                    postal_code?: string | null | undefined;
                    city?: string | null | undefined;
                    country?: string | undefined;
                    area_level_two?: {
                        id?: string | undefined;
                        type?: string | undefined;
                    } | null | undefined;
                } | undefined;
            } | undefined;
            customer_meeting_room?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            attendees?: {
                type?: "user" | "contact" | undefined;
                id?: string | undefined;
            }[] | undefined;
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
            status?: "open" | "done" | undefined;
            recurrence?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            workOrder?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
        } | undefined;
    }>;
    schedule(params: RequestBody<"meetings.schedule">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    update(params: RequestBody<"meetings.update">): Promise<void>;
    complete(params: RequestBody<"meetings.complete">): Promise<void>;
    createReport(params: RequestBody<"meetings.createReport">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    delete(params: RequestBody<"meetings.delete">): Promise<void>;
}
//# sourceMappingURL=meetings.d.ts.map