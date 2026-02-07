import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class UsersResource extends BaseResource {
    /** Get the current authenticated user */
    me(): Promise<{
        data?: {
            id?: string;
            account?: {
                id?: string;
                type?: string;
            } & {
                type?: string;
            };
            first_name?: string;
            last_name?: string;
            email?: string;
            email_verification_status?: "pending" | "confirmed";
            telephones?: {
                type?: "phone" | "mobile" | "fax";
                number?: string;
            }[];
            language?: ("nl-BE" | "da" | "de" | "en" | "es" | "fi" | "fr" | "it" | "nb" | "nl" | "pl" | "pt" | "sv" | "tr") & unknown;
            function?: string;
            time_zone?: string;
            preferences?: {
                invoiceable?: boolean;
                historic_time_tracking_limit?: {
                    unit?: "hour";
                    value?: number;
                } | null;
                whitelabeling?: boolean;
            };
        };
    }>;
    /** Get a list of users */
    list(params?: RequestBody<"users.list">): Promise<{
        data?: {
            id?: string;
            account?: {
                id?: string;
                type?: string;
            } & {
                type?: string;
            };
            first_name?: string;
            last_name?: string;
            email?: string;
            telephones?: {
                type?: "phone" | "mobile" | "fax";
                number?: string;
            }[];
            language?: string;
            function?: string;
            status?: "active" | "deactivated";
            teams?: ({
                id?: string;
                type?: string;
            } & {
                type?: string;
            })[];
        }[];
    }>;
    /** Get details for a single user */
    info(params: RequestBody<"users.info">): Promise<{
        data?: {
            id?: string;
            account?: {
                id?: string;
                type?: string;
            } & {
                type?: string;
            };
            first_name?: string;
            last_name?: string;
            email?: string;
            telephones?: {
                type?: "phone" | "mobile" | "fax";
                number?: string;
            }[];
            language?: ("nl-BE" | "da" | "de" | "en" | "es" | "fi" | "fr" | "it" | "nb" | "nl" | "pl" | "pt" | "sv" | "tr") & unknown;
            function?: string;
            time_zone?: string;
            status?: "active" | "deactivated";
            teams?: ({
                id?: string;
                type?: string;
            } & {
                type?: string;
            })[];
            external_rate?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
        };
    }>;
    /** Get days off for a user */
    listDaysOff(params: RequestBody<"users.listDaysOff">): Promise<{
        data?: {
            id?: string;
            starts_at?: string;
            ends_at?: string;
            user?: {
                id?: string;
                type?: string;
            } & {
                type?: "user";
            };
            leave_type?: {
                id?: string;
                type?: string;
            } & {
                type?: "dayOffType";
            };
            status?: "approved" | "not_approved" | "pending";
        }[];
        meta?: {
            page?: {
                size?: number;
                number?: number;
            };
            matches?: number;
        } & unknown;
    }>;
    /** Get the week schedule for a user */
    getWeekSchedule(params: RequestBody<"users.getWeekSchedule">): Promise<{
        data?: {
            periods?: {
                type?: "working_hours" | "lunch_break";
                start?: {
                    day?: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
                    time?: string;
                };
                end?: {
                    day?: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
                    time?: string;
                };
            }[];
        };
    }>;
}
//# sourceMappingURL=users.d.ts.map