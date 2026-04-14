import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class PlannableItemsResource extends BaseResource {
    /** Get a list of plannable items */
    list(params?: RequestBody<"plannableItems.list">): Promise<{
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
        }[] | undefined;
    }>;
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