import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class PlannableItemsResource extends BaseResource {
    /** Iterate all plannableItems — auto-paginates across every page. */
    list(params?: RequestBody<"plannableItems.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        source?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
        total_duration?: {
            unit?: "minutes" | undefined;
            value?: number | undefined;
        } | undefined;
        planned_duration?: {
            unit?: "minutes" | undefined;
            value?: number | undefined;
        } | undefined;
        unplanned_duration?: {
            unit?: "minutes" | undefined;
            value?: number | undefined;
        } | undefined;
    }, void, undefined>;
    /** Get details for a single plannable item */
    info(params: RequestBody<"plannableItems.info">): Promise<{
        data?: {
            id?: string | undefined;
            source?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            total_duration?: {
                unit?: "minutes" | undefined;
                value?: number | undefined;
            } | undefined;
            planned_duration?: {
                unit?: "minutes" | undefined;
                value?: number | undefined;
            } | undefined;
            unplanned_duration?: {
                unit?: "minutes" | undefined;
                value?: number | undefined;
            } | undefined;
        } | undefined;
    }>;
}
//# sourceMappingURL=plannable-items.d.ts.map