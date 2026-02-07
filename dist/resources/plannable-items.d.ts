import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class PlannableItemsResource extends BaseResource {
    list(params?: RequestBody<"plannableItems.list">): Promise<{
        data?: {
            id?: string;
            source?: {
                id?: string;
                type?: string;
            } & {
                type?: string;
            };
            total_duration?: {
                unit?: "minutes";
                value?: number;
            };
            planned_duration?: {
                unit?: "minutes";
                value?: number;
            };
            unplanned_duration?: {
                unit?: "minutes";
                value?: number;
            };
        }[];
    }>;
    info(params: RequestBody<"plannableItems.info">): Promise<{
        data?: {
            id?: string;
            source?: {
                id?: string;
                type?: string;
            } & {
                type?: string;
            };
            total_duration?: {
                unit?: "minutes";
                value?: number;
            };
            planned_duration?: {
                unit?: "minutes";
                value?: number;
            };
            unplanned_duration?: {
                unit?: "minutes";
                value?: number;
            };
        };
    }>;
}
//# sourceMappingURL=plannable-items.d.ts.map