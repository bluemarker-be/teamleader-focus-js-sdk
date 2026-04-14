import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class InvoicesResource extends BaseResource {
    /** Iterate all invoices — auto-paginates across every page. */
    list(params?: RequestBody<"invoices.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        department?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
        invoice_number?: string | null | undefined;
        invoice_date?: string | null | undefined;
        status?: "draft" | "outstanding" | "matched" | undefined;
        due_on?: string | null | undefined;
        paid?: boolean | undefined;
        paid_at?: string | null | undefined;
        sent?: boolean | undefined;
        purchase_order_number?: string | null | undefined;
        payment_reference?: string | null | undefined;
        invoicee?: {
            name?: string | undefined;
            vat_number?: string | null | undefined;
            customer?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            for_attention_of?: {
                name?: string | null | undefined;
                contact?: {
                    id?: string | undefined;
                    type?: string | undefined;
                } | null | undefined;
            } | null | undefined;
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
            payable?: {
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
            due?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | undefined;
            due_incasso_inclusive?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | undefined;
            fixed_late_fee?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | undefined;
            interest?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | undefined;
        } | undefined;
        currency_exchange_rate?: {
            from?: ("BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR") | undefined;
            to?: ("BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR") | undefined;
            rate?: number | undefined;
        } | undefined;
        created_at?: string | undefined;
        updated_at?: string | undefined;
        web_url?: string | undefined;
        file?: {
            id?: string | undefined;
            type?: string | undefined;
        } | null | undefined;
        deal?: {
            id?: string | undefined;
            type?: string | undefined;
        } | null | undefined;
        project?: {
            id?: string | undefined;
            type?: string | undefined;
        } | null | undefined;
        subscription?: {
            id?: string | undefined;
            type?: string | undefined;
        } | null | undefined;
        delivery_date?: string | null | undefined;
    }, void, undefined>;
    /** Get details for a single invoice */
    info(params: RequestBody<"invoices.info">): Promise<{
        data?: {
            id?: string | undefined;
            department?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            invoice_number?: string | null | undefined;
            invoice_date?: string | null | undefined;
            status?: "draft" | "outstanding" | "matched" | undefined;
            due_on?: string | null | undefined;
            paid?: boolean | undefined;
            paid_at?: string | null | undefined;
            sent?: boolean | undefined;
            purchase_order_number?: string | null | undefined;
            invoicee?: {
                name?: string | undefined;
                vat_number?: string | null | undefined;
                customer?: {
                    id?: string | undefined;
                    type?: string | undefined;
                } | undefined;
                for_attention_of?: {
                    name?: string | null | undefined;
                    contact?: {
                        id?: string | undefined;
                        type?: string | undefined;
                    } | null | undefined;
                } | null | undefined;
                email?: string | null | undefined;
                national_identification_number?: string | null | undefined;
            } | undefined;
            discounts?: {
                type?: "percentage" | undefined;
                value?: number | undefined;
                description?: string | undefined;
            }[] | undefined;
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
                withheld_taxes?: {
                    id?: string | undefined;
                    taxable?: {
                        amount: number;
                        currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                    } | undefined;
                    withheld?: {
                        amount: number;
                        currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                    } | undefined;
                }[] | undefined;
                payable?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
                due?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
                due_incasso_inclusive?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
                fixed_late_fee?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
                interest?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
            } | undefined;
            payment_term?: {
                type?: "cash" | "end_of_month" | "after_invoice_date" | undefined;
                days?: number | undefined;
            } | undefined;
            payments?: {
                paid_at?: string | undefined;
                payment?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
            }[] | undefined;
            payment_reference?: string | null | undefined;
            note?: string | null | undefined;
            currency?: string | undefined;
            currency_exchange_rate?: {
                from?: ("BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR") | undefined;
                to?: ("BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR") | undefined;
                rate?: number | undefined;
            } | undefined;
            expected_payment_method?: {
                method?: "sepa_direct_debit" | "direct_debit" | "credit_card" | undefined;
                reference?: string | null | undefined;
            } | {
                method?: "cash" | "cheque" | "bankers_draft" | "bank_transfer" | "payment_card" | undefined;
            } | null | undefined;
            file?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            deal?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            project?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            on_hold_since?: string | null | undefined;
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
            created_at?: string | undefined;
            updated_at?: string | undefined;
            document_template?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            delivery_date?: string | null | undefined;
            peppol_status?: ("sending" | "sending_failed" | "sent" | "application_acknowledged" | "application_accepted" | "application_rejected" | "receiver_acknowledged" | "receiver_accepted" | "receiver_rejected" | "receiver_is_processing" | "receiver_awaits_feedback" | "receiver_conditionally_accepted" | "receiver_paid" | null) | undefined;
        } | undefined;
    }>;
    /** Download an invoice PDF */
    download(params: RequestBody<"invoices.download">): Promise<{
        data?: {
            location?: string | undefined;
            expires?: string | undefined;
        } | undefined;
    }>;
    /** Create a draft invoice */
    draft(params: RequestBody<"invoices.draft">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Update a draft invoice */
    update(params: RequestBody<"invoices.update">): Promise<void>;
    /** Update a booked invoice */
    updateBooked(params: RequestBody<"invoices.updateBooked">): Promise<void>;
    /** Copy an invoice */
    copy(params: RequestBody<"invoices.copy">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Book a draft invoice */
    book(params: RequestBody<"invoices.book">): Promise<void>;
    /** Delete a draft invoice */
    delete(params: RequestBody<"invoices.delete">): Promise<void>;
    /** Register a payment for an invoice */
    registerPayment(params: RequestBody<"invoices.registerPayment">): Promise<void>;
    /** Remove payments from an invoice */
    removePayments(params: RequestBody<"invoices.removePayments">): Promise<void>;
    /** Credit a full invoice */
    credit(params: RequestBody<"invoices.credit">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Partially credit an invoice */
    creditPartially(params: RequestBody<"invoices.creditPartially">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Send an invoice via email */
    send(params: RequestBody<"invoices.send">): Promise<void>;
    /** Send an invoice via Peppol */
    sendViaPeppol(params: RequestBody<"invoices.sendViaPeppol">): Promise<void>;
}
//# sourceMappingURL=invoices.d.ts.map