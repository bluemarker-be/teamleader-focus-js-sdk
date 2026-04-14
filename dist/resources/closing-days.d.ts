import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class ClosingDaysResource extends BaseResource {
    /** Iterate all closingDays — auto-paginates across every page. */
    list(params?: RequestBody<"closingDays.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        date?: string | undefined;
    }, void, undefined>;
    add(params: RequestBody<"closingDays.add">): Promise<{
        data?: {
            type?: string | undefined;
            id: string;
        } | undefined;
    }>;
    delete(params: RequestBody<"closingDays.delete">): Promise<void>;
}
//# sourceMappingURL=closing-days.d.ts.map