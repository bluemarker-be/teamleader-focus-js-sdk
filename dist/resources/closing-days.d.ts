import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class ClosingDaysResource extends BaseResource {
    list(params?: RequestBody<"closingDays.list">): Promise<{
        data?: {
            id?: string;
            date?: string;
        }[];
        meta?: {
            page?: {
                size?: number;
                number?: number;
            };
            matches?: number;
        } & unknown;
    }>;
    add(params: RequestBody<"closingDays.add">): Promise<{
        data?: {
            type?: string;
            id: string;
        };
    }>;
    delete(params: RequestBody<"closingDays.delete">): Promise<void>;
}
//# sourceMappingURL=closing-days.d.ts.map