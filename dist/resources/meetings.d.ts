import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class MeetingsResource extends BaseResource {
    list(params?: RequestBody<"meetings.list">): Promise<{
        data?: {
            id?: string;
            title?: string;
            description?: string;
            created_at?: string;
            scheduled_at?: string;
            duration?: {
                unit?: "min";
                value?: number;
            };
            tracked_time?: {
                total?: {
                    unit?: "min";
                } & {
                    value?: number;
                    unit?: string;
                };
            };
            estimated_time?: {
                total?: {
                    unit?: "s";
                } & {
                    value?: number;
                    unit?: string;
                };
            };
            customer?: {
                type: "contact" | "company";
                id: string;
            } | null;
            project?: ({
                id?: string;
                type?: string;
            } & {
                type?: "project" | "nextgenProject";
            }) | null;
            milestone?: {
                id?: string;
                type?: string;
            } | null;
            group?: {
                id?: string;
                type?: string;
            } | null;
            attendees?: {
                type?: "user" | "contact";
                id?: string;
            }[];
            status?: "open" | "done";
            recurrence?: {
                id?: string;
                type?: string;
            } | null;
        }[];
    }>;
    info(params: RequestBody<"meetings.info">): Promise<{
        data?: {
            id?: string;
            title?: string;
            description?: string;
            created_at?: string;
            scheduled_at?: string;
            duration?: {
                unit?: "min";
                value?: number;
            };
            tracked_time?: {
                total?: {
                    unit?: "min";
                } & {
                    value?: number;
                    unit?: string;
                };
            };
            estimated_time?: {
                total?: {
                    unit?: "s";
                } & {
                    value?: number;
                    unit?: string;
                };
            };
            customer?: {
                type: "contact" | "company";
                id: string;
            } | null;
            project?: ({
                id?: string;
                type?: string;
            } & {
                type?: "project" | "nextgenProject";
            }) | null;
            milestone?: {
                id?: string;
                type?: string;
            } | null;
            group?: {
                id?: string;
                type?: string;
            } | null;
            deal?: {
                id?: string;
                type?: string;
            } | null;
            location?: {
                type?: "virtual" | "calendarResource";
            } | {
                type?: "contact" | "company";
                address?: {
                    line_1?: string | null;
                    postal_code?: string | null;
                    city?: string | null;
                    country?: string;
                    area_level_two?: ({
                        id?: string;
                        type?: string;
                    } & {
                        type?: string;
                    }) | null;
                };
            } | {
                type?: string;
                id?: string;
                address?: {
                    line_1?: string | null;
                    postal_code?: string | null;
                    city?: string | null;
                    country?: string;
                    area_level_two?: ({
                        id?: string;
                        type?: string;
                    } & {
                        type?: string;
                    }) | null;
                };
            };
            online_meeting_room?: {
                id?: string;
                type?: string;
            } | null;
            attendees?: {
                type?: "user" | "contact";
                id?: string;
            }[];
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
            status?: "open" | "done";
            recurrence?: {
                id?: string;
                type?: string;
            } | null;
            workOrder?: {
                id?: string;
                type?: string;
            } | null;
        };
    }>;
    schedule(params: RequestBody<"meetings.schedule">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
    update(params: RequestBody<"meetings.update">): Promise<void>;
    complete(params: RequestBody<"meetings.complete">): Promise<void>;
    createReport(params: RequestBody<"meetings.createReport">): Promise<void>;
    delete(params: RequestBody<"meetings.delete">): Promise<void>;
}
//# sourceMappingURL=meetings.d.ts.map