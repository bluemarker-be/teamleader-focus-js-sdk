import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class EventsResource extends BaseResource {
    list(params?: RequestBody<"events.list">): Promise<{
        data?: {
            id?: string | undefined;
            creator?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            task?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            activity_type?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            title?: string | undefined;
            description?: string | undefined;
            starts_at?: string | undefined;
            ends_at?: string | undefined;
            location?: string | undefined;
            attendees?: {
                type?: "user" | "contact" | undefined;
                id?: string | undefined;
            }[] | undefined;
            links?: {
                id?: string | undefined;
                type?: "company" | "contact" | "deal" | undefined;
            }[] | undefined;
        }[] | undefined;
    }>;
    info(params: RequestBody<"events.info">): Promise<{
        data?: {
            id?: string | undefined;
            title?: string | undefined;
            description?: string | undefined;
            creator?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            task?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            activity_type?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            starts_at?: string | undefined;
            ends_at?: string | undefined;
            location?: string | undefined;
            attendees?: {
                type?: "user" | "contact" | undefined;
                id?: string | undefined;
            }[] | undefined;
            links?: {
                id?: string | undefined;
                type?: "company" | "contact" | "deal" | "work_order" | undefined;
            }[] | undefined;
        } | undefined;
    }>;
    create(params: RequestBody<"events.create">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    update(params: RequestBody<"events.update">): Promise<void>;
    cancel(params: RequestBody<"events.cancel">): Promise<void>;
}
//# sourceMappingURL=events.d.ts.map