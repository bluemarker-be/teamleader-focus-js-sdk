import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class ProductsResource extends BaseResource {
    /** Iterate all products — auto-paginates across every page. */
    list(params?: RequestBody<"products.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        name?: string | null | undefined;
        description?: string | null | undefined;
        code?: string | null | undefined;
        unit?: {
            id?: string | undefined;
            type?: string | undefined;
        } | null | undefined;
        added_at?: string | undefined;
        updated_at?: string | undefined;
        stock?: {
            amount?: number | null | undefined;
        } | undefined;
        configuration?: {
            stock_threshold?: {
                minimum?: number | undefined;
                action?: "notify" | undefined;
            } | null | undefined;
        } | null | undefined;
    }, void, undefined>;
    /** Get details for a single product */
    info(params: RequestBody<"products.info">): Promise<{
        data?: {
            id?: string | undefined;
            name?: string | null | undefined;
            description?: string | null | undefined;
            code?: string | null | undefined;
            purchase_price?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
            selling_price?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
            unit?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            tax?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            suppliers?: {
                supplier?: {
                    type?: "company" | "contact" | undefined;
                    id?: string | undefined;
                } | undefined;
                purchase_price?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | null | undefined;
                product_code?: string | undefined;
                minimum_order_amount?: number | undefined;
                classification?: "primary" | "secondary" | undefined;
            }[] | undefined;
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
            price_list_prices?: unknown[][] | undefined;
            product_category?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            stock?: {
                amount?: number | null | undefined;
            } | undefined;
            configuration?: {
                stock_threshold?: {
                    minimum?: number | undefined;
                    action?: "notify" | undefined;
                } | null | undefined;
            } | null | undefined;
            added_at?: string | undefined;
            updated_at?: string | undefined;
        } | undefined;
    }>;
    /** Create a new product */
    add(params: RequestBody<"products.add">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Update an existing product */
    update(params: RequestBody<"products.update">): Promise<void>;
    /** Delete a product */
    delete(params: RequestBody<"products.delete">): Promise<void>;
}
//# sourceMappingURL=products.d.ts.map