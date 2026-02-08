import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class DealsResource extends BaseResource {
    /** Get a list of deals */
    list(params?: RequestBody<"deals.list">): Promise<{
        data?: {
            id?: string | undefined;
            title?: string | undefined;
            summary?: string | null | undefined;
            reference?: string | undefined;
            status?: "new" | "open" | "won" | "lost" | undefined;
            lead?: {
                customer?: {
                    type: "contact" | "company";
                    id: string;
                } | undefined;
                contact_person?: {
                    id?: string | undefined;
                    type?: string | undefined;
                } | undefined;
            } | undefined;
            department?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            estimated_value?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | undefined;
            estimated_closing_date?: string | undefined;
            estimated_probability?: number | undefined;
            weighted_value?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | undefined;
            purchase_order_number?: string | null | undefined;
            current_phase?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            responsible_user?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            closed_at?: string | undefined;
            source?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            lost_reason?: {
                reason?: {
                    id?: string | undefined;
                    type?: string | undefined;
                } | null | undefined;
                remark?: string | null | undefined;
            } | null | undefined;
            created_at?: string | undefined;
            updated_at?: string | undefined;
            web_url?: string | undefined;
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
            currency_exchange_rate?: {
                from?: ("BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR") | undefined;
                to?: ("BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR") | undefined;
                rate?: number | undefined;
            } | undefined;
            pipeline?: {
                type?: string | undefined;
                id?: string | undefined;
            } | undefined;
        }[] | undefined;
    }>;
    /** Get details for a single deal */
    info(params: RequestBody<"deals.info">): Promise<{
        data?: {
            id?: string | undefined;
            title?: string | undefined;
            summary?: string | null | undefined;
            reference?: string | undefined;
            status?: "open" | "won" | "lost" | undefined;
            lead?: {
                customer?: {
                    type: "contact" | "company";
                    id: string;
                } | undefined;
                contact_person?: {
                    id?: string | undefined;
                    type?: string | undefined;
                } | undefined;
            } | undefined;
            department?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            estimated_value?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | undefined;
            estimated_closing_date?: string | undefined;
            estimated_probability?: number | undefined;
            weighted_value?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | undefined;
            purchase_order_number?: string | null | undefined;
            current_phase?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            responsible_user?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            closed_at?: string | undefined;
            source?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            phase_history?: {
                phase?: {
                    id?: string | undefined;
                    type?: string | undefined;
                } | undefined;
                started_at?: string | undefined;
                started_by?: {
                    id?: string | undefined;
                    type?: string | undefined;
                } | undefined;
            }[] | undefined;
            quotations?: {
                id?: string | undefined;
                type?: string | undefined;
            }[] | undefined;
            lost_reason?: {
                reason?: {
                    id?: string | undefined;
                    type?: string | undefined;
                } | null | undefined;
                remark?: string | null | undefined;
            } | null | undefined;
            created_at?: string | undefined;
            updated_at?: string | undefined;
            web_url?: string | undefined;
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
            currency_exchange_rate?: {
                from?: ("BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR") | undefined;
                to?: ("BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR") | undefined;
                rate?: number | undefined;
            } | undefined;
            pipeline?: {
                type?: string | undefined;
                id?: string | undefined;
            } | undefined;
        } | undefined;
    }>;
    /** Create a new deal */
    create(params: RequestBody<"deals.create">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Update an existing deal */
    update(params: RequestBody<"deals.update">): Promise<void>;
    /** Move a deal to a different phase */
    move(params: RequestBody<"deals.move">): Promise<void>;
    /** Mark a deal as won */
    win(params: RequestBody<"deals.win">): Promise<void>;
    /** Mark a deal as lost */
    lose(params: RequestBody<"deals.lose">): Promise<void>;
    /** Delete a deal */
    delete(params: RequestBody<"deals.delete">): Promise<void>;
}
//# sourceMappingURL=deals.d.ts.map