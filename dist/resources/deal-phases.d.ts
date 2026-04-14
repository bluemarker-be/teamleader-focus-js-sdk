import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class DealPhasesResource extends BaseResource {
    /** Iterate all dealPhases — auto-paginates across every page. */
    list(params: RequestBody<"dealPhases.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        name?: string | undefined;
        actions?: ("create_event" | "create_call" | "create_task")[] | undefined;
        requires_attention_after?: {
            amount?: number | undefined;
            unit?: "days" | "weeks" | undefined;
        } | undefined;
        probability?: number | undefined;
    }, void, undefined>;
    /** Create a new deal phase */
    create(params: RequestBody<"dealPhases.create">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Update an existing deal phase */
    update(params: RequestBody<"dealPhases.update">): Promise<void>;
    /** Move a deal phase to a different position */
    move(params: RequestBody<"dealPhases.move">): Promise<void>;
    /** Delete a deal phase */
    delete(params: RequestBody<"dealPhases.delete">): Promise<void>;
}
//# sourceMappingURL=deal-phases.d.ts.map