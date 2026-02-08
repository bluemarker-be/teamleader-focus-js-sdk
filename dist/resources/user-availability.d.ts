import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class UserAvailabilityResource extends BaseResource {
    total(params: RequestBody<"userAvailability.total">): Promise<{
        data?: {
            user?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            availability?: {
                gross_time_available?: {
                    unit?: "minutes" | undefined;
                    value?: number | undefined;
                } | undefined;
                net_time_available?: {
                    unit?: "minutes" | undefined;
                    value?: number | undefined;
                } | undefined;
                planned_time?: {
                    unit?: "minutes" | undefined;
                    value?: number | undefined;
                } | undefined;
                unplanned_time?: {
                    unit?: "minutes" | undefined;
                    value?: number | undefined;
                } | undefined;
            } | undefined;
        }[] | undefined;
    }>;
    daily(params: RequestBody<"userAvailability.daily">): Promise<{
        data?: {
            user?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            availabilities?: {
                date?: string | undefined;
                availability?: {
                    gross_time_available?: {
                        unit?: "minutes" | undefined;
                        value?: number | undefined;
                    } | undefined;
                    net_time_available?: {
                        unit?: "minutes" | undefined;
                        value?: number | undefined;
                    } | undefined;
                    planned_time?: {
                        unit?: "minutes" | undefined;
                        value?: number | undefined;
                    } | undefined;
                    unplanned_time?: {
                        unit?: "minutes" | undefined;
                        value?: number | undefined;
                    } | undefined;
                } | undefined;
            }[] | undefined;
        }[] | undefined;
    }>;
}
//# sourceMappingURL=user-availability.d.ts.map