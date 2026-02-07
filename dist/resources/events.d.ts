import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class EventsResource extends BaseResource {
    list(params?: RequestBody<"events.list">): Promise<{
        data?: {
            id?: string;
            creator?: {
                id?: string;
                type?: string;
            };
            task?: {
                id?: string;
                type?: string;
            };
            activity_type?: {
                id?: string;
                type?: string;
            };
            title?: string;
            description?: string;
            starts_at?: string;
            ends_at?: string;
            location?: string;
            attendees?: {
                type?: "user" | "contact";
                id?: string;
            }[];
            links?: ({
                id?: string;
                type?: string;
            } & {
                type?: "contact" | "company" | "deal";
            })[];
        }[];
    }>;
    info(params: RequestBody<"events.info">): Promise<{
        data?: {
            id?: string;
            title?: string;
            description?: string;
            creator?: {
                id?: string;
                type?: string;
            };
            task?: {
                id?: string;
                type?: string;
            };
            activity_type?: {
                id?: string;
                type?: string;
            };
            starts_at?: string;
            ends_at?: string;
            location?: string;
            attendees?: {
                type?: "user" | "contact";
                id?: string;
            }[];
            links?: ({
                id?: string;
                type?: string;
            } & {
                type?: "contact" | "company" | "work_order" | "deal";
            })[];
        };
    }>;
    create(params: RequestBody<"events.create">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
    update(params: RequestBody<"events.update">): Promise<void>;
    cancel(params: RequestBody<"events.cancel">): Promise<void>;
}
//# sourceMappingURL=events.d.ts.map