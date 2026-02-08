import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
/** Legacy projects (pre-v2). Use ProjectsResource for the newer Projects v2 API. */
export declare class LegacyProjectsResource extends BaseResource {
    /** Get a list of legacy projects */
    list(params?: RequestBody<"LegacyProjects.list">): Promise<{
        data?: {
            id?: string | undefined;
            reference?: string | undefined;
            title?: string | undefined;
            description?: string | undefined;
            status?: "active" | "on_hold" | "done" | "cancelled" | undefined;
            customer?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            starts_on?: string | undefined;
            due_on?: string | undefined;
            created_at?: string | undefined;
            source?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            actuals?: {
                billable_amount?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
                costs?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
                result?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
                profit_percentage?: number | undefined;
            } | undefined;
            budget?: {
                provided?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
                spent?: {
                    total?: {
                        amount: number;
                        currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                    } | undefined;
                    time?: {
                        amount: number;
                        currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                    } | undefined;
                    materials?: {
                        amount: number;
                        currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                    } | undefined;
                } | undefined;
                remaining?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
                allocated?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | null | undefined;
                forecasted?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | null | undefined;
            } | undefined;
        }[] | undefined;
    }>;
    /** Get details for a single legacy project */
    info(params: RequestBody<"LegacyProjects.info">): Promise<{
        data?: {
            id?: string | undefined;
            reference?: string | undefined;
            title?: string | undefined;
            description?: string | undefined;
            status?: "active" | "on_hold" | "done" | "cancelled" | undefined;
            customer?: {
                type: "contact" | "company";
                id: string;
            } | undefined;
            starts_on?: string | undefined;
            due_on?: string | undefined;
            source?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            milestones?: {
                id?: string | undefined;
                type?: string | undefined;
            }[] | undefined;
            participants?: {
                participant?: {
                    id?: string | undefined;
                    type?: "user" | undefined;
                } | undefined;
                role?: "decision_maker" | "member" | undefined;
            }[] | undefined;
            purchase_order_number?: string | null | undefined;
            custom_fields?: {
                definition?: {
                    type?: string | undefined;
                    id?: string | undefined;
                } | undefined;
                value?: string | number | boolean | string[] | {
                    id?: string | undefined;
                    type?: "user" | "company" | "contact" | "product" | undefined;
                } | undefined;
            }[] | undefined;
            actuals?: {
                billable_amount?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
                costs?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
                result?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
                profit_percentage?: number | undefined;
            } | undefined;
            budget?: {
                provided?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
                spent?: {
                    total?: {
                        amount: number;
                        currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                    } | undefined;
                    time?: {
                        amount: number;
                        currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                    } | undefined;
                    materials?: {
                        amount: number;
                        currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                    } | undefined;
                } | undefined;
                remaining?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
                allocated?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | null | undefined;
                forecasted?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | null | undefined;
            } | undefined;
        } | undefined;
    }>;
    /** Create a new legacy project */
    create(params: RequestBody<"LegacyProjects.create">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Update an existing legacy project */
    update(params: RequestBody<"LegacyProjects.update">): Promise<void>;
    /** Close a legacy project */
    close(params: RequestBody<"LegacyProjects.close">): Promise<void>;
    /** Reopen a closed legacy project */
    reopen(params: RequestBody<"LegacyProjects.reopen">): Promise<void>;
    /** Delete a legacy project */
    delete(params: RequestBody<"LegacyProjects.delete">): Promise<void>;
    /** Add a participant to a legacy project */
    addParticipant(params: RequestBody<"LegacyProjects.addParticipant">): Promise<void>;
    /** Update a participant on a legacy project */
    updateParticipant(params: RequestBody<"LegacyProjects.updateParticipant">): Promise<void>;
}
//# sourceMappingURL=legacy-projects.d.ts.map