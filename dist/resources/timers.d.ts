import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class TimersResource extends BaseResource {
    current(params?: RequestBody<"timers.current">): Promise<{
        data?: {
            id?: string;
            user?: {
                id?: string;
                type?: string;
            };
            work_type?: {
                id?: string;
                type?: string;
            };
            started_at?: string;
            description?: string;
            subject?: {
                id?: string;
                type?: string;
            } & {
                type?: "company" | "contact" | "event" | "todo" | "milestone" | "ticket";
            };
            invoiceable?: boolean;
        };
    }>;
    start(params: RequestBody<"timers.start">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
    stop(params: RequestBody<"timers.stop">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
    update(params: RequestBody<"timers.update">): Promise<void>;
}
//# sourceMappingURL=timers.d.ts.map