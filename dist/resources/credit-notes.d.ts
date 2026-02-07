import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class CreditNotesResource extends BaseResource {
    list(params?: RequestBody<"creditNotes.list">): Promise<{
        data?: {
            id?: string;
            department?: {
                id?: string;
                type?: string;
            };
            credit_note_number?: string | null;
            credit_note_date?: string | null;
            status?: "booked";
            invoice?: {
                id?: string;
                type?: string;
            } | null;
            paid?: boolean;
            paid_at?: string | null;
            invoicee?: {
                name?: string;
                vat_number?: string | null;
                customer?: {
                    id?: string;
                    type?: string;
                };
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
            };
            created_at?: string;
            updated_at?: string;
        }[];
    }>;
    info(params: RequestBody<"creditNotes.info">): Promise<{
        data?: {
            id?: string;
            department?: {
                id?: string;
                type?: string;
            };
            credit_note_number?: string | null;
            credit_note_date?: string | null;
            status?: "booked";
            invoice?: {
                id?: string;
                type?: string;
            } | null;
            paid?: boolean;
            paid_at?: string | null;
            invoicee?: {
                name?: string;
                vat_number?: string | null;
                customer?: {
                    id?: string;
                    type?: string;
                };
                email?: string | null;
                national_identification_number?: string | null;
            };
            discounts?: {
                type?: "percentage";
                value?: number;
                description?: string;
            }[];
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
            };
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
                    extended_description?: string;
                    product_category?: {
                        id?: string;
                        type?: string;
                    } | null;
                    unit_price?: ({
                        tax?: "excluding";
                    } & ({
                        amount: number;
                        currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                    } & Record<string, never>)) & Record<string, never>;
                })[];
            }[];
            currency?: string;
            currency_exchange_rate?: {
                from?: ("BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR") & unknown;
                to?: ("BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR") & unknown;
                rate?: number;
            };
            created_at?: string;
            updated_at?: string;
            document_template?: {
                id?: string;
                type?: string;
            };
            peppol_status?: ("sending" | "sending_failed" | "sent" | "application_acknowledged" | "application_accepted" | "application_rejected" | "receiver_acknowledged" | "receiver_accepted" | "receiver_rejected" | "receiver_is_processing" | "receiver_awaits_feedback" | "receiver_conditionally_accepted" | "receiver_paid" | null) & unknown;
        }[];
    }>;
    download(params: RequestBody<"creditNotes.download">): Promise<{
        data?: {
            location?: string;
            expires?: string;
        };
    }>;
}
//# sourceMappingURL=credit-notes.d.ts.map