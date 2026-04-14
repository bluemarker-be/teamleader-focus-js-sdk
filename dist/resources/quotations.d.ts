import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class QuotationsResource extends BaseResource {
    /** Iterate all quotations — auto-paginates across every page. */
    list(params?: RequestBody<"quotations.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        deal?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
        currency_exchange_rate?: {
            from?: ("BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR") | undefined;
            to?: ("BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR") | undefined;
            rate?: number | undefined;
        } | undefined;
        total?: {
            tax_exclusive?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | undefined;
            tax_inclusive?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | undefined;
            taxes?: {
                rate?: number | undefined;
                taxable?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
                tax?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
            }[] | undefined;
            purchase_price?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
        } | undefined;
        created_at?: string | null | undefined;
        updated_at?: string | null | undefined;
        status?: "open" | "accepted" | "expired" | "rejected" | "closed" | undefined;
        name?: string | undefined;
        expiry?: {
            expires_after?: string | undefined;
            action_after_expiry?: "lock" | "none" | undefined;
        } | undefined;
    }, void, undefined>;
    /** Get details for a single quotation */
    info(params: RequestBody<"quotations.info">): Promise<{
        data?: {
            id?: string | undefined;
            deal?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            grouped_lines?: {
                section?: {
                    title?: string | undefined;
                } | undefined;
                line_items?: {
                    product?: {
                        id?: string | undefined;
                        type?: string | undefined;
                    } | null | undefined;
                    quantity?: number | undefined;
                    description?: string | undefined;
                    extended_description?: string | undefined;
                    unit?: {
                        id?: string | undefined;
                        type?: string | undefined;
                    } | null | undefined;
                    unit_price?: {
                        tax?: "excluding" | undefined;
                        amount: number;
                        currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                    } | undefined;
                    tax?: {
                        id?: string | undefined;
                        type?: string | undefined;
                    } | undefined;
                    discount?: {
                        value?: number | undefined;
                        type?: "percentage" | undefined;
                    } | null | undefined;
                    total?: {
                        tax_exclusive?: {
                            amount: number;
                            currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                        } | undefined;
                        tax_exclusive_before_discount?: {
                            amount: number;
                            currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                        } | undefined;
                        tax_inclusive?: {
                            amount: number;
                            currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                        } | undefined;
                        tax_inclusive_before_discount?: {
                            amount: number;
                            currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                        } | undefined;
                    } | undefined;
                    purchase_price?: {
                        amount: number;
                        currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                    } | null | undefined;
                    periodicity?: {
                        unit: "week";
                        period: 1 | 2;
                    } | {
                        unit: "month";
                        period: 1 | 2 | 3 | 4 | 6;
                    } | {
                        unit: "year";
                        period: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
                    } | null | undefined;
                }[] | undefined;
            }[] | undefined;
            currency?: string | undefined;
            currency_exchange_rate?: {
                from?: ("BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR") | undefined;
                to?: ("BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR") | undefined;
                rate?: number | undefined;
            } | undefined;
            text?: string | undefined;
            total?: {
                tax_exclusive?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
                tax_inclusive?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
                taxes?: {
                    rate?: number | undefined;
                    taxable?: {
                        amount: number;
                        currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                    } | undefined;
                    tax?: {
                        amount: number;
                        currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                    } | undefined;
                }[] | undefined;
                purchase_price?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | null | undefined;
            } | undefined;
            discounts?: {
                type?: "percentage" | undefined;
                value?: number | undefined;
                description?: string | undefined;
            }[] | undefined;
            created_at?: string | null | undefined;
            updated_at?: string | null | undefined;
            status?: "open" | "accepted" | "expired" | "rejected" | "closed" | undefined;
            name?: string | undefined;
            document_template?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            expiry?: {
                expires_after?: string | undefined;
                action_after_expiry?: "lock" | "none" | undefined;
            } | undefined;
        } | undefined;
    }>;
    /** Download a quotation PDF */
    download(params: RequestBody<"quotations.download">): Promise<{
        data?: {
            location?: string | undefined;
            expires?: string | undefined;
        } | undefined;
    }>;
    /** Create a new quotation */
    create(params: RequestBody<"quotations.create">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Send a quotation via email */
    send(params: RequestBody<"quotations.send">): Promise<void>;
    /** Update an existing quotation */
    update(params: RequestBody<"quotations.update">): Promise<void>;
    /** Accept a quotation */
    accept(params: RequestBody<"quotations.accept">): Promise<void>;
    /** Delete a quotation */
    delete(params: RequestBody<"quotations.delete">): Promise<void>;
}
//# sourceMappingURL=quotations.d.ts.map