import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class ReservationsResource extends BaseResource {
    list(params?: RequestBody<"reservations.list">): Promise<{
        data?: {
            id?: string;
            plannable_item?: {
                id?: string;
                type?: string;
            } & {
                type?: string;
            };
            date?: string;
            duration?: {
                unit?: "minutes";
                value?: number;
            };
            assignee?: {
                type?: string;
                id?: string;
            } & {
                type: "team" | "user";
            };
            origin?: {
                id?: string;
                type?: string;
            } & {
                type?: string;
            };
        }[];
    }>;
    create(params: RequestBody<"reservations.create">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
    update(params: RequestBody<"reservations.update">): Promise<void>;
    delete(params: RequestBody<"reservations.delete">): Promise<void>;
}
//# sourceMappingURL=reservations.d.ts.map