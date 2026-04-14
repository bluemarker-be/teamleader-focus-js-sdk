import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class SubscriptionsResource extends BaseResource {
    /** Iterate all subscriptions — auto-paginates across every page. */
    list(params?: RequestBody<"subscriptions.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        title?: string | undefined;
        note?: string | null | undefined;
        status?: "active" | "deactivated" | undefined;
        department?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
        invoicee?: {
            customer?: {
                type: "contact" | "company";
                id: string;
            } | undefined;
            for_attention_of?: {
                name?: string | null | undefined;
                contact?: {
                    id?: string | undefined;
                    type?: string | undefined;
                } | null | undefined;
            } | null | undefined;
        } | undefined;
        project?: {
            id?: string | undefined;
            type?: string | undefined;
        } | null | undefined;
        starts_on?: string | undefined;
        ends_on?: string | null | undefined;
        next_renewal_date?: string | null | undefined;
        billing_cycle?: {
            periodicity?: {
                unit: "week";
                period: 1 | 2;
            } | {
                unit: "month";
                period: 1 | 2 | 3 | 4 | 6;
            } | {
                unit: "year";
                period: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
            } | undefined;
            days_in_advance?: 0 | 7 | 14 | 21 | 28 | undefined;
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
        } | undefined;
        web_url?: string | undefined;
        purchase_order_number?: string | null | undefined;
        delivery_information?: {
            type?: "set_days_after_invoice_date" | undefined;
            number_of_days_after_invoice_date?: number | undefined;
        } | null | undefined;
        created_at?: string | null | undefined;
    }, void, undefined>;
    /** Get details for a single subscription */
    info(params: RequestBody<"subscriptions.info">): Promise<{
        data?: {
            id?: string | undefined;
            title?: string | undefined;
            note?: string | null | undefined;
            status?: "active" | "deactivated" | undefined;
            department?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            invoicee?: {
                customer?: {
                    type: "contact" | "company";
                    id: string;
                } | undefined;
                for_attention_of?: {
                    name?: string | null | undefined;
                    contact?: {
                        id?: string | undefined;
                        type?: string | undefined;
                    } | null | undefined;
                } | null | undefined;
            } | undefined;
            project?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            next_renewal_date?: string | null | undefined;
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
            } | undefined;
            web_url?: string | undefined;
            starts_on?: string | undefined;
            ends_on?: string | null | undefined;
            billing_cycle?: {
                periodicity?: {
                    unit: "week";
                    period: 1 | 2;
                } | {
                    unit: "month";
                    period: 1 | 2 | 3 | 4 | 6;
                } | {
                    unit: "year";
                    period: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
                } | undefined;
                days_in_advance?: 0 | 7 | 14 | 21 | 28 | undefined;
            } | undefined;
            payment_term?: {
                type?: "cash" | "end_of_month" | "after_invoice_date" | undefined;
                days?: number | undefined;
            } | undefined;
            grouped_lines?: {
                section?: {
                    title?: string | null | undefined;
                } | undefined;
                line_items?: {
                    product?: {
                        id?: string | undefined;
                        type?: string | undefined;
                    } | null | undefined;
                    quantity?: number | undefined;
                    description?: string | undefined;
                    extended_description?: string | null | undefined;
                    unit?: {
                        id?: string | undefined;
                        type?: string | undefined;
                    } | null | undefined;
                    unit_price?: {
                        amount: number;
                        tax: "excluding";
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
                    product_category?: {
                        id?: string | undefined;
                        type?: string | undefined;
                    } | null | undefined;
                    withheld_tax?: {
                        id?: string | undefined;
                        type?: string | undefined;
                    } | null | undefined;
                }[] | undefined;
            }[] | undefined;
            invoice_generation?: {
                action?: "draft" | "book" | "book_and_send" | undefined;
                sending_methods?: {
                    method?: "email" | "peppol" | "postal_service" | undefined;
                }[] | undefined;
                payment_method?: "direct_debit" | undefined;
            } | undefined;
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
            document_template?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            currency?: string | undefined;
            purchase_order_number?: string | null | undefined;
            delivery_information?: {
                type?: "set_days_after_invoice_date" | undefined;
                number_of_days_after_invoice_date?: number | undefined;
            } | null | undefined;
            created_at?: string | null | undefined;
        } | undefined;
    }>;
    /** Create a new subscription */
    create(params: RequestBody<"subscriptions.create">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Update an existing subscription */
    update(params: RequestBody<"subscriptions.update">): Promise<void>;
    /** Deactivate a subscription */
    deactivate(params: RequestBody<"subscriptions.deactivate">): Promise<void>;
}
//# sourceMappingURL=subscriptions.d.ts.map