import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class TimeTrackingResource extends BaseResource {
    /** Get a list of time tracking entries */
    list(params?: RequestBody<"timeTracking.list">): Promise<{
        data?: {
            id?: string;
            user?: {
                id?: string;
                type?: string;
            };
            work_type?: {
                id?: string;
                type?: string;
            };
            started_on?: string;
            started_at?: string | null;
            ended_at?: string | null;
            duration?: number;
            description?: string;
            subject?: {
                id?: string;
                type?: string;
            } & {
                type?: "company" | "contact" | "event" | "todo" | "milestone" | "ticket";
            };
            invoiceable?: boolean;
            billing_info?: {
                type?: "invoice" | "prepaid";
                invoice?: {
                    id?: string;
                    type?: string;
                } | null;
            } | null;
            materials?: {
                product?: {
                    id?: string;
                    type?: string;
                } | null;
                description?: string;
                unit_price?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                };
                quantity?: number;
            }[];
            relates_to?: ({
                id?: string;
                type?: string;
            } & {
                type?: "contact" | "company" | "project" | "milestone" | "ticket" | "nextgenProject" | "nextgenProjectGroup";
            })[];
            hourly_rate?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            };
        }[];
    }>;
    /** Get details for a single time tracking entry */
    info(params: RequestBody<"timeTracking.info">): Promise<{
        data?: {
            id?: string;
            user?: {
                id?: string;
                type?: string;
            };
            work_type?: {
                id?: string;
                type?: string;
            };
            started_on?: string;
            started_at?: string | null;
            ended_at?: string | null;
            duration?: number;
            description?: string;
            subject?: {
                id?: string;
                type?: string;
            } & {
                type?: "company" | "contact" | "event" | "todo" | "milestone" | "ticket";
            };
            invoiceable?: boolean;
            locked?: boolean;
            billing_info?: {
                type?: "invoice" | "prepaid";
                invoice?: {
                    id?: string;
                    type?: string;
                } | null;
            } | null;
            materials?: {
                product?: {
                    id?: string;
                    type?: string;
                } | null;
                description?: string;
                unit_price?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                };
                quantity?: number;
            }[];
            relates_to?: ({
                id?: string;
                type?: string;
            } & {
                type?: "contact" | "company" | "project" | "milestone" | "ticket" | "nextgenProject" | "nextgenProjectGroup";
            })[];
            hourly_rate?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            };
        };
        meta?: {
            updatable?: boolean;
        };
    }>;
    /** Add a new time tracking entry */
    add(params: RequestBody<"timeTracking.add">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
    /** Update a time tracking entry */
    update(params: RequestBody<"timeTracking.update">): Promise<void>;
    /** Resume a time tracking entry (start timer) */
    resume(params: RequestBody<"timeTracking.resume">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
    /** Delete a time tracking entry */
    delete(params: RequestBody<"timeTracking.delete">): Promise<void>;
}
//# sourceMappingURL=time-tracking.d.ts.map