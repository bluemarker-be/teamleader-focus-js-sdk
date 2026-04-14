import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class TimersResource extends BaseResource {
    /** Get the currently running timer */
    current(params?: RequestBody<"timers.current">): Promise<{
        data?: {
            id?: string | undefined;
            user?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            work_type?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            started_at?: string | undefined;
            description?: string | undefined;
            subject?: {
                id?: string | undefined;
                type?: "company" | "contact" | "milestone" | "ticket" | "todo" | "event" | undefined;
            } | undefined;
            invoiceable?: boolean | undefined;
        } | undefined;
    }>;
    /** Start a new timer */
    start(params: RequestBody<"timers.start">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Stop the running timer */
    stop(params?: RequestBody<"timers.stop">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Update the running timer */
    update(params: RequestBody<"timers.update">): Promise<void>;
}
//# sourceMappingURL=timers.d.ts.map