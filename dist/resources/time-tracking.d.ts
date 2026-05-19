import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class TimeTrackingResource extends BaseResource {
    /** Iterate all timeTracking — auto-paginates across every page. */
    list(params?: RequestBody<"timeTracking.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        user?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
        work_type?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
        started_on?: string | undefined;
        started_at?: string | null | undefined;
        ended_at?: string | null | undefined;
        duration?: number | undefined;
        description?: string | undefined;
        subject?: {
            id?: string | undefined;
            type?: "company" | "contact" | "milestone" | "ticket" | "todo" | "event" | undefined;
        } | undefined;
        invoiceable?: boolean | undefined;
        billing_info?: {
            type?: "invoice" | "prepaid" | undefined;
            invoice?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
        } | null | undefined;
        materials?: {
            product?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            description?: string | undefined;
            unit_price?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | undefined;
            quantity?: number | undefined;
        }[] | undefined;
        relates_to?: {
            id?: string | undefined;
            type?: "company" | "contact" | "project" | "milestone" | "ticket" | "nextgenProject" | "nextgenTask" | "nextgenProjectGroup" | undefined;
        }[] | undefined;
        hourly_rate?: {
            amount: number;
            currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
        } | undefined;
    }, void, undefined>;
    /** Get details for a single time tracking entry */
    info(params: RequestBody<"timeTracking.info">): Promise<{
        data?: {
            id?: string | undefined;
            user?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            work_type?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            started_on?: string | undefined;
            started_at?: string | null | undefined;
            ended_at?: string | null | undefined;
            duration?: number | undefined;
            description?: string | undefined;
            subject?: {
                id?: string | undefined;
                type?: "company" | "contact" | "milestone" | "ticket" | "todo" | "event" | undefined;
            } | undefined;
            invoiceable?: boolean | undefined;
            locked?: boolean | undefined;
            billing_info?: {
                type?: "invoice" | "prepaid" | undefined;
                invoice?: {
                    id?: string | undefined;
                    type?: string | undefined;
                } | null | undefined;
            } | null | undefined;
            materials?: {
                product?: {
                    id?: string | undefined;
                    type?: string | undefined;
                } | null | undefined;
                description?: string | undefined;
                unit_price?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
                quantity?: number | undefined;
            }[] | undefined;
            relates_to?: {
                id?: string | undefined;
                type?: "company" | "contact" | "project" | "milestone" | "ticket" | "nextgenProject" | "nextgenTask" | "nextgenProjectGroup" | undefined;
            }[] | undefined;
            hourly_rate?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | undefined;
        } | undefined;
        meta?: {
            updatable?: boolean | undefined;
        } | undefined;
    }>;
    /** Add a new time tracking entry */
    add(params: RequestBody<"timeTracking.add">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Update a time tracking entry */
    update(params: RequestBody<"timeTracking.update">): Promise<void>;
    /** Resume a time tracking entry (start timer) */
    resume(params: RequestBody<"timeTracking.resume">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Delete a time tracking entry */
    delete(params: RequestBody<"timeTracking.delete">): Promise<void>;
}
//# sourceMappingURL=time-tracking.d.ts.map