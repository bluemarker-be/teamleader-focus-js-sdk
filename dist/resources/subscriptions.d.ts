import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class SubscriptionsResource extends BaseResource {
    list(params?: RequestBody<"subscriptions.list">): Promise<{
        data?: {
            id?: string;
            title?: string;
            note?: string | null;
            status?: "active" | "deactivated";
            department?: {
                id?: string;
                type?: string;
            };
            invoicee?: {
                customer?: {
                    type: "contact" | "company";
                    id: string;
                };
                for_attention_of?: {
                    name?: string | null;
                    contact?: {
                        id?: string;
                        type?: string;
                    } | null;
                } | null;
            };
            project?: {
                id?: string;
                type?: string;
            } | null;
            starts_on?: string;
            ends_on?: string | null;
            next_renewal_date?: string | null;
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
                };
                days_in_advance?: 0 | 7 | 14 | 21 | 28;
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
            web_url?: string;
            created_at?: string | null;
        }[];
    }>;
    info(params: RequestBody<"subscriptions.info">): Promise<{
        data?: {
            id?: string;
            title?: string;
            note?: string | null;
            status?: "active" | "deactivated";
            department?: {
                id?: string;
                type?: string;
            };
            invoicee?: {
                customer?: {
                    type: "contact" | "company";
                    id: string;
                };
                for_attention_of?: {
                    name?: string | null;
                    contact?: {
                        id?: string;
                        type?: string;
                    } | null;
                } | null;
            };
            project?: {
                id?: string;
                type?: string;
            } | null;
            next_renewal_date?: string | null;
            total?: {
                tax_exclusive?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                };
                tax_inclusive?: {
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
            web_url?: string;
            starts_on?: string;
            ends_on?: string | null;
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
                };
                days_in_advance?: 0 | 7 | 14 | 21 | 28;
            } & unknown;
            payment_term?: {
                type?: "cash" | "end_of_month" | "after_invoice_date";
                days?: number;
            };
            grouped_lines?: {
                section?: {
                    title?: string | null;
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
            invoice_generation?: {
                action?: "draft" | "book" | "book_and_send";
                sending_methods?: {
                    method?: "email" | "peppol" | "postal_service";
                }[];
                payment_method?: "direct_debit";
            };
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
            document_template?: {
                id?: string;
                type?: string;
            };
            currency?: string;
            created_at?: string | null;
        };
    }>;
    create(params: RequestBody<"subscriptions.create">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
    update(params: RequestBody<"subscriptions.update">): Promise<void>;
    deactivate(params: RequestBody<"subscriptions.deactivate">): Promise<void>;
}
//# sourceMappingURL=subscriptions.d.ts.map