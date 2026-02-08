import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class CreditNotesResource extends BaseResource {
    list(params?: RequestBody<"creditNotes.list">): Promise<{
        data?: {
            id?: string | undefined;
            department?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            credit_note_number?: string | null | undefined;
            credit_note_date?: string | null | undefined;
            status?: "booked" | undefined;
            invoice?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            paid?: boolean | undefined;
            paid_at?: string | null | undefined;
            invoicee?: {
                name?: string | undefined;
                vat_number?: string | null | undefined;
                customer?: {
                    id?: string | undefined;
                    type?: string | undefined;
                } | undefined;
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
            } | undefined;
            created_at?: string | undefined;
            updated_at?: string | undefined;
        }[] | undefined;
    }>;
    info(params: RequestBody<"creditNotes.info">): Promise<{
        data?: {
            id?: string | undefined;
            department?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            credit_note_number?: string | null | undefined;
            credit_note_date?: string | null | undefined;
            status?: "booked" | undefined;
            invoice?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            paid?: boolean | undefined;
            paid_at?: string | null | undefined;
            invoicee?: {
                name?: string | undefined;
                vat_number?: string | null | undefined;
                customer?: {
                    id?: string | undefined;
                    type?: string | undefined;
                } | undefined;
                email?: string | null | undefined;
                national_identification_number?: string | null | undefined;
            } | undefined;
            discounts?: {
                type?: "percentage" | undefined;
                value?: number | undefined;
                description?: string | undefined;
            }[] | undefined;
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
                    product_category?: {
                        id?: string | undefined;
                        type?: string | undefined;
                    } | null | undefined;
                }[] | undefined;
            }[] | undefined;
            currency?: string | undefined;
            currency_exchange_rate?: {
                from?: ("BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR") | undefined;
                to?: ("BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR") | undefined;
                rate?: number | undefined;
            } | undefined;
            created_at?: string | undefined;
            updated_at?: string | undefined;
            document_template?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            peppol_status?: ("sending" | "sending_failed" | "sent" | "application_acknowledged" | "application_accepted" | "application_rejected" | "receiver_acknowledged" | "receiver_accepted" | "receiver_rejected" | "receiver_is_processing" | "receiver_awaits_feedback" | "receiver_conditionally_accepted" | "receiver_paid" | null) | undefined;
        }[] | undefined;
    }>;
    download(params: RequestBody<"creditNotes.download">): Promise<{
        data?: {
            location?: string | undefined;
            expires?: string | undefined;
        } | undefined;
    }>;
    /** Send a credit note via Peppol */
    sendViaPeppol(params: RequestBody<"creditNotes.sendViaPeppol">): Promise<void>;
}
//# sourceMappingURL=credit-notes.d.ts.map