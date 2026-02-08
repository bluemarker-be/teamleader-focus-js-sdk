import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class ReservationsResource extends BaseResource {
    list(params?: RequestBody<"reservations.list">): Promise<{
        data?: {
            id?: string | undefined;
            plannable_item?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            date?: string | undefined;
            duration?: {
                unit?: "minutes" | undefined;
                value?: number | undefined;
            } | undefined;
            assignee?: {
                type: "user" | "team";
                id?: string | undefined;
            } | undefined;
            origin?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
        }[] | undefined;
    }>;
    create(params: RequestBody<"reservations.create">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    update(params: RequestBody<"reservations.update">): Promise<void>;
    delete(params: RequestBody<"reservations.delete">): Promise<void>;
}
//# sourceMappingURL=reservations.d.ts.map