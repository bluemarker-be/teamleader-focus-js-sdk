import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class ClosingDaysResource extends BaseResource {
    list(params?: RequestBody<"closingDays.list">): Promise<{
        data?: {
            id?: string | undefined;
            date?: string | undefined;
        }[] | undefined;
        meta?: {
            page?: {
                size?: number | undefined;
                number?: number | undefined;
            } | undefined;
            matches?: number | undefined;
        } | undefined;
    }>;
    add(params: RequestBody<"closingDays.add">): Promise<{
        data?: {
            type?: string | undefined;
            id: string;
        } | undefined;
    }>;
    delete(params: RequestBody<"closingDays.delete">): Promise<void>;
}
//# sourceMappingURL=closing-days.d.ts.map