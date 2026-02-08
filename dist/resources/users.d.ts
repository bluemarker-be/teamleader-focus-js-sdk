import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class UsersResource extends BaseResource {
    /** Get the current authenticated user */
    me(): Promise<{
        data?: {
            id?: string | undefined;
            account?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            email?: string | undefined;
            email_verification_status?: "pending" | "confirmed" | undefined;
            telephones?: {
                type?: "phone" | "mobile" | "fax" | undefined;
                number?: string | undefined;
            }[] | undefined;
            language?: (("nl-BE" | "da" | "de" | "en" | "es" | "fi" | "fr" | "it" | "nb" | "nl" | "pl" | "pt" | "sv" | "tr") & unknown) | undefined;
            function?: string | undefined;
            time_zone?: string | undefined;
            preferences?: {
                invoiceable?: boolean | undefined;
                historic_time_tracking_limit?: {
                    unit?: "hour" | undefined;
                    value?: number | undefined;
                } | null | undefined;
                whitelabeling?: boolean | undefined;
            } | undefined;
        } | undefined;
    }>;
    /** Get a list of users */
    list(params?: RequestBody<"users.list">): Promise<{
        data?: {
            id?: string | undefined;
            account?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            email?: string | undefined;
            telephones?: {
                type?: "phone" | "mobile" | "fax" | undefined;
                number?: string | undefined;
            }[] | undefined;
            language?: string | undefined;
            function?: string | undefined;
            status?: "active" | "deactivated" | undefined;
            teams?: {
                id?: string | undefined;
                type?: string | undefined;
            }[] | undefined;
        }[] | undefined;
    }>;
    /** Get details for a single user */
    info(params: RequestBody<"users.info">): Promise<{
        data?: {
            id?: string | undefined;
            account?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            email?: string | undefined;
            telephones?: {
                type?: "phone" | "mobile" | "fax" | undefined;
                number?: string | undefined;
            }[] | undefined;
            language?: (("nl-BE" | "da" | "de" | "en" | "es" | "fi" | "fr" | "it" | "nb" | "nl" | "pl" | "pt" | "sv" | "tr") & unknown) | undefined;
            function?: string | undefined;
            time_zone?: string | undefined;
            status?: "active" | "deactivated" | undefined;
            teams?: {
                id?: string | undefined;
                type?: string | undefined;
            }[] | undefined;
            external_rate?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
        } | undefined;
    }>;
    /** Get days off for a user */
    listDaysOff(params: RequestBody<"users.listDaysOff">): Promise<{
        data?: {
            id?: string | undefined;
            starts_at?: string | undefined;
            ends_at?: string | undefined;
            user?: {
                id?: string | undefined;
                type?: "user" | undefined;
            } | undefined;
            leave_type?: {
                id?: string | undefined;
                type?: "dayOffType" | undefined;
            } | undefined;
            status?: "approved" | "not_approved" | "pending" | undefined;
        }[] | undefined;
        meta?: {
            page?: {
                size?: number | undefined;
                number?: number | undefined;
            } | undefined;
            matches?: number | undefined;
        } | undefined;
    }>;
    /** Get the week schedule for a user */
    getWeekSchedule(params: RequestBody<"users.getWeekSchedule">): Promise<{
        data?: {
            periods?: {
                type?: "working_hours" | "lunch_break" | undefined;
                start?: {
                    day?: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday" | undefined;
                    time?: string | undefined;
                } | undefined;
                end?: {
                    day?: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday" | undefined;
                    time?: string | undefined;
                } | undefined;
            }[] | undefined;
        } | undefined;
    }>;
}
//# sourceMappingURL=users.d.ts.map