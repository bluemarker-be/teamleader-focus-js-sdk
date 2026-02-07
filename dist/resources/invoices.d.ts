import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class InvoicesResource extends BaseResource {
    /** Get a list of invoices */
    list(params?: RequestBody<"invoices.list">): Promise<{
        data?: {
            id?: string;
            department?: {
                id?: string;
                type?: string;
            };
            invoice_number?: string | null;
            invoice_date?: string | null;
            status?: "draft" | "outstanding" | "matched";
            due_on?: string | null;
            paid?: boolean;
            paid_at?: string | null;
            sent?: boolean;
            purchase_order_number?: string | null;
            payment_reference?: string | null;
            invoicee?: {
                name?: string;
                vat_number?: string | null;
                customer?: {
                    id?: string;
                    type?: string;
                };
                for_attention_of?: {
                    name?: string | null;
                    contact?: {
                        id?: string;
                        type?: string;
                    } | null;
                } | null;
            };
            total?: {
                tax_exclusive?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                };
                tax_inclusive?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                };
                payable?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                };
                taxes?: {
                    rate?: number;
                    taxable?: {
                        amount: number;
                        currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                    };
                    tax?: {
                        amount: number;
                        currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                    };
                }[];
                due?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                };
                due_incasso_inclusive?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                };
                fixed_late_fee?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                };
                interest?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                };
            };
            currency_exchange_rate?: {
                from?: ("BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR") & unknown;
                to?: ("BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR") & unknown;
                rate?: number;
            };
            created_at?: string;
            updated_at?: string;
            web_url?: string;
            file?: {
                id?: string;
                type?: string;
            } | null;
            deal?: {
                id?: string;
                type?: string;
            } | null;
            project?: {
                id?: string;
                type?: string;
            } | null;
            delivery_date?: string | null;
        }[];
    }>;
    /** Get details for a single invoice */
    info(params: RequestBody<"invoices.info">): Promise<{
        data?: {
            id?: string;
            department?: {
                id?: string;
                type?: string;
            };
            invoice_number?: string | null;
            invoice_date?: string | null;
            status?: "draft" | "outstanding" | "matched";
            due_on?: string | null;
            paid?: boolean;
            paid_at?: string | null;
            sent?: boolean;
            purchase_order_number?: string | null;
            invoicee?: {
                name?: string;
                vat_number?: string | null;
                customer?: {
                    id?: string;
                    type?: string;
                };
                for_attention_of?: {
                    name?: string | null;
                    contact?: {
                        id?: string;
                        type?: string;
                    } | null;
                } | null;
                email?: string | null;
                national_identification_number?: string | null;
            };
            discounts?: {
                type?: "percentage";
                value?: number;
                description?: string;
            }[];
            grouped_lines?: {
                section?: {
                    title?: string;
                };
                line_items?: ({
                    product?: {
                        id?: string;
                        type?: string;
                    } | null;
                    quantity?: number;
                    description?: string;
                    extended_description?: string | null;
                    unit?: {
                        id?: string;
                        type?: string;
                    } | null;
                    unit_price?: Record<string, never>;
                    tax?: {
                        id?: string;
                        type?: string;
                    };
                    discount?: {
                        value?: number;
                        type?: "percentage";
                    } | null;
                    total?: {
                        tax_exclusive?: {
                            amount: number;
                            currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                        };
                        tax_exclusive_before_discount?: {
                            amount: number;
                            currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                        };
                        tax_inclusive?: {
                            amount: number;
                            currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                        };
                        tax_inclusive_before_discount?: {
                            amount: number;
                            currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                        };
                    };
                } & {
                    product_category?: {
                        id?: string;
                        type?: string;
                    } | null;
                    unit_price?: {
                        amount: number;
                        tax: "excluding";
                    } & Record<string, never>;
                    withheld_tax?: {
                        id?: string;
                        type?: string;
                    } | null;
                })[];
            }[];
            total?: {
                tax_exclusive?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                };
                tax_exclusive_before_discount?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                };
                tax_inclusive?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                };
                tax_inclusive_before_discount?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                };
                taxes?: {
                    rate?: number;
                    taxable?: {
                        amount: number;
                        currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                    };
                    tax?: {
                        amount: number;
                        currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                    };
                }[];
                withheld_taxes?: {
                    id?: string;
                    taxable?: {
                        amount: number;
                        currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                    };
                    withheld?: {
                        amount: number;
                        currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                    };
                }[];
                payable?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                };
                due?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                };
                due_incasso_inclusive?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                };
                fixed_late_fee?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                };
                interest?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                };
            };
            payment_term?: {
                type?: "cash" | "end_of_month" | "after_invoice_date";
                days?: number;
            };
            payments?: {
                paid_at?: string;
                payment?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                };
            }[];
            payment_reference?: string | null;
            note?: string | null;
            currency?: string;
            currency_exchange_rate?: {
                from?: ("BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR") & unknown;
                to?: ("BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR") & unknown;
                rate?: number;
            };
            expected_payment_method?: ({
                method?: "sepa_direct_debit" | "direct_debit" | "credit_card";
                reference?: string | null;
            } | {
                method?: "cash" | "cheque" | "bankers_draft" | "bank_transfer" | "payment_card";
            }) | null;
            file?: {
                id?: string;
                type?: string;
            } | null;
            deal?: {
                id?: string;
                type?: string;
            } | null;
            project?: {
                id?: string;
                type?: string;
            } | null;
            on_hold_since?: string | null;
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
            created_at?: string;
            updated_at?: string;
            document_template?: {
                id?: string;
                type?: string;
            };
            delivery_date?: string | null;
            peppol_status?: ("sending" | "sending_failed" | "sent" | "application_acknowledged" | "application_accepted" | "application_rejected" | "receiver_acknowledged" | "receiver_accepted" | "receiver_rejected" | "receiver_is_processing" | "receiver_awaits_feedback" | "receiver_conditionally_accepted" | "receiver_paid" | null) & unknown;
        };
    }>;
    /** Download an invoice PDF */
    download(params: RequestBody<"invoices.download">): Promise<{
        data?: {
            location?: string;
            expires?: string;
        };
    }>;
    /** Create a draft invoice */
    draft(params: RequestBody<"invoices.draft">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
    /** Update a draft invoice */
    update(params: RequestBody<"invoices.update">): Promise<void>;
    /** Update a booked invoice */
    updateBooked(params: RequestBody<"invoices.updateBooked">): Promise<void>;
    /** Copy an invoice */
    copy(params: RequestBody<"invoices.copy">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
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
            id?: string;
            type?: string;
        };
    }>;
    /** Partially credit an invoice */
    creditPartially(params: RequestBody<"invoices.creditPartially">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
    /** Send an invoice via email */
    send(params: RequestBody<"invoices.send">): Promise<void>;
}
//# sourceMappingURL=invoices.d.ts.map