import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class DealPhasesResource extends BaseResource {
    list(params: RequestBody<"dealPhases.list">): Promise<{
        data?: {
            id?: string;
            name?: string;
            actions?: ("create_event" | "create_call" | "create_task")[];
            requires_attention_after?: {
                amount?: number;
                unit?: "days" | "weeks";
            } & unknown;
            probability?: number;
        }[];
    }>;
    create(params: RequestBody<"dealPhases.create">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
    update(params: RequestBody<"dealPhases.update">): Promise<void>;
    duplicate(params: RequestBody<"dealPhases.duplicate">): Promise<{
        data?: {
            type?: string;
            id: string;
        };
    }>;
    move(params: RequestBody<"dealPhases.move">): Promise<void>;
    delete(params: RequestBody<"dealPhases.delete">): Promise<void>;
}
//# sourceMappingURL=deal-phases.d.ts.map