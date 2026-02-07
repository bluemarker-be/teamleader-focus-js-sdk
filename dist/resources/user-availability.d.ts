import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class UserAvailabilityResource extends BaseResource {
    total(params: RequestBody<"userAvailability.total">): Promise<{
        data?: {
            user?: {
                id?: string;
                type?: string;
            } & {
                type?: string;
            };
            availability?: {
                gross_time_available?: {
                    unit?: "minutes";
                    value?: number;
                };
                net_time_available?: {
                    unit?: "minutes";
                    value?: number;
                };
                planned_time?: {
                    unit?: "minutes";
                    value?: number;
                };
                unplanned_time?: {
                    unit?: "minutes";
                    value?: number;
                };
            };
        }[];
    }>;
    daily(params: RequestBody<"userAvailability.daily">): Promise<{
        data?: {
            user?: {
                id?: string;
                type?: string;
            } & {
                type?: string;
            };
            availabilities?: {
                date?: string;
                availability?: {
                    gross_time_available?: {
                        unit?: "minutes";
                        value?: number;
                    };
                    net_time_available?: {
                        unit?: "minutes";
                        value?: number;
                    };
                    planned_time?: {
                        unit?: "minutes";
                        value?: number;
                    };
                    unplanned_time?: {
                        unit?: "minutes";
                        value?: number;
                    };
                };
            }[];
        }[];
    }>;
}
//# sourceMappingURL=user-availability.d.ts.map