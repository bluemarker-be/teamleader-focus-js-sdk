import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class ProductsResource extends BaseResource {
    /** Get a list of products */
    list(params?: RequestBody<"products.list">): Promise<{
        data?: {
            id?: string;
            name?: string | null;
            description?: string | null;
            code?: string | null;
            unit?: {
                id?: string;
                type?: string;
            } | null;
            added_at?: string;
            updated_at?: string;
            stock?: {
                amount?: number | null;
            } & unknown;
            configuration?: {
                stock_threshold?: {
                    minimum?: number;
                    action?: "notify";
                } | null;
            } | null;
        }[];
    }>;
    /** Get details for a single product */
    info(params: RequestBody<"products.info">): Promise<{
        data?: {
            id?: string;
            name?: string | null;
            description?: string | null;
            code?: string | null;
            purchase_price?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            selling_price?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            unit?: {
                id?: string;
                type?: string;
            } | null;
            tax?: {
                id?: string;
                type?: string;
            } | null;
            suppliers?: {
                supplier?: {
                    type?: "company" | "contact";
                    id?: string;
                };
                purchase_price?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | null;
                product_code?: string;
                minimum_order_amount?: number;
                classification?: "primary" | "secondary";
            }[];
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
            price_list_prices?: unknown[][];
            product_category?: {
                id?: string;
                type?: string;
            } | null;
            stock?: {
                amount?: number | null;
            } & unknown;
            configuration?: {
                stock_threshold?: {
                    minimum?: number;
                    action?: "notify";
                } | null;
            } | null;
            added_at?: string;
            updated_at?: string;
        };
    }>;
    /** Create a new product */
    add(params: RequestBody<"products.add">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
    /** Update an existing product */
    update(params: RequestBody<"products.update">): Promise<void>;
    /** Delete a product */
    delete(params: RequestBody<"products.delete">): Promise<void>;
}
//# sourceMappingURL=products.d.ts.map