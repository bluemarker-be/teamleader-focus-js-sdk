import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class DealsResource extends BaseResource {
    /** Get a list of deals */
    list(params?: RequestBody<"deals.list">): Promise<{
        data?: {
            id?: string;
            title?: string;
            summary?: string | null;
            reference?: string;
            status?: "new" | "open" | "won" | "lost";
            lead?: {
                customer?: {
                    type: "contact" | "company";
                    id: string;
                };
                contact_person?: {
                    id?: string;
                    type?: string;
                };
            };
            department?: {
                id?: string;
                type?: string;
            };
            estimated_value?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            };
            estimated_closing_date?: string;
            estimated_probability?: number;
            weighted_value?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            };
            purchase_order_number?: string | null;
            current_phase?: {
                id?: string;
                type?: string;
            };
            responsible_user?: {
                id?: string;
                type?: string;
            };
            closed_at?: string;
            source?: {
                id?: string;
                type?: string;
            };
            lost_reason?: {
                reason?: {
                    id?: string;
                    type?: string;
                } | null;
                remark?: string | null;
            } | null;
            created_at?: string;
            updated_at?: string;
            web_url?: string;
            custom_fields?: {
                definition?: {
                    type?: string;
                    id?: string;
                };
                value?: string | number | string[] | boolean | ({
                    id?: string;
                    type?: string;
                } & {
                    type?: "company" | "contact" | "product" | "user";
                });
            }[];
            currency_exchange_rate?: {
                from?: ("BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR") & unknown;
                to?: ("BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR") & unknown;
                rate?: number;
            };
            pipeline?: {
                type?: string;
                id?: string;
            };
        }[];
    }>;
    /** Get details for a single deal */
    info(params: RequestBody<"deals.info">): Promise<{
        data?: {
            id?: string;
            title?: string;
            summary?: string | null;
            reference?: string;
            status?: "open" | "won" | "lost";
            lead?: {
                customer?: {
                    type: "contact" | "company";
                    id: string;
                };
                contact_person?: {
                    id?: string;
                    type?: string;
                };
            };
            department?: {
                id?: string;
                type?: string;
            };
            estimated_value?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            };
            estimated_closing_date?: string;
            estimated_probability?: number;
            weighted_value?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            };
            purchase_order_number?: string | null;
            current_phase?: {
                id?: string;
                type?: string;
            };
            responsible_user?: {
                id?: string;
                type?: string;
            };
            closed_at?: string;
            source?: {
                id?: string;
                type?: string;
            };
            phase_history?: {
                phase?: {
                    id?: string;
                    type?: string;
                };
                started_at?: string;
                started_by?: {
                    id?: string;
                    type?: string;
                };
            }[];
            quotations?: {
                id?: string;
                type?: string;
            }[];
            lost_reason?: {
                reason?: {
                    id?: string;
                    type?: string;
                } | null;
                remark?: string | null;
            } | null;
            created_at?: string;
            updated_at?: string;
            web_url?: string;
            custom_fields?: {
                definition?: {
                    type?: string;
                    id?: string;
                };
                value?: string | number | string[] | boolean | ({
                    id?: string;
                    type?: string;
                } & {
                    type?: "company" | "contact" | "product" | "user";
                });
            }[];
            currency_exchange_rate?: {
                from?: ("BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR") & unknown;
                to?: ("BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR") & unknown;
                rate?: number;
            };
            pipeline?: {
                type?: string;
                id?: string;
            };
        };
    }>;
    /** Create a new deal */
    create(params: RequestBody<"deals.create">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
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