import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class OrdersResource extends BaseResource {
    /** Get a list of orders */
    list(params?: RequestBody<"orders.list">): Promise<{
        data?: {
            id?: string | undefined;
            name?: string | undefined;
            order_date?: string | null | undefined;
            order_number?: number | null | undefined;
            delivery_date?: string | null | undefined;
            payment_term?: {
                type?: "cash" | "end_of_month" | "after_invoice_date" | undefined;
                days?: number | undefined;
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
                purchase_price_tax_exclusive?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
                purchase_price_tax_inclusive?: {
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
            supplier?: {
                type?: "company" | "contact" | undefined;
                id?: string | undefined;
            } | null | undefined;
            department?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            deal?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            project?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            assignee?: {
                id?: string | undefined;
                type?: string | undefined;
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
        }[] | undefined;
    }>;
    /** Get details for a single order */
    info(params: RequestBody<"orders.info">): Promise<{
        data?: {
            id?: string | undefined;
            name?: string | undefined;
            order_date?: string | null | undefined;
            order_number?: number | null | undefined;
            delivery_date?: string | null | undefined;
            payment_term?: {
                type?: "cash" | "end_of_month" | "after_invoice_date" | undefined;
                days?: number | undefined;
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
                    project?: {
                        id?: string | undefined;
                        type?: string | undefined;
                    } | null | undefined;
                    group?: {
                        id?: string | undefined;
                        type?: string | undefined;
                    } | null | undefined;
                    purchase_price?: {
                        amount: number;
                        currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                    } | null | undefined;
                }[] | undefined;
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
                purchase_price_tax_exclusive?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
                purchase_price_tax_inclusive?: {
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
            supplier?: {
                type?: "company" | "contact" | undefined;
                id?: string | undefined;
            } | null | undefined;
            department?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            deal?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            project?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            assignee?: {
                id?: string | undefined;
                type?: string | undefined;
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
        } | undefined;
    }>;
}
//# sourceMappingURL=orders.d.ts.map