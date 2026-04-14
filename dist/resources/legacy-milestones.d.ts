import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
/** Legacy milestones (pre-v2). Only available for accounts not yet migrated to Projects v2. */
export declare class LegacyMilestonesResource extends BaseResource {
    /** Iterate all LegacyMilestones — auto-paginates across every page. */
    list(params?: RequestBody<"LegacyMilestones.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        project?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
        starts_on?: string | null | undefined;
        due_on?: string | undefined;
        name?: string | undefined;
        responsible_user?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
        status?: "open" | "closed" | undefined;
        invoicing_method?: "time_and_materials" | "fixed_price" | "non_invoiceable" | undefined;
        depends_on?: {
            id?: string | undefined;
            type?: string | undefined;
        } | null | undefined;
        dependency_for?: {
            id?: string | undefined;
            type?: string | undefined;
        }[] | undefined;
        actuals?: {
            billable_amount?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | undefined;
            costs?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | undefined;
            result?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | undefined;
        } | undefined;
        budget?: {
            provided?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | undefined;
            spent?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | undefined;
            remaining?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | undefined;
            allocated?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
            forecasted?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
        } | undefined;
    }, void, undefined>;
    /** Get details for a single milestone */
    info(params: RequestBody<"LegacyMilestones.info">): Promise<{
        data?: {
            id?: string | undefined;
            project?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            starts_on?: string | null | undefined;
            due_on?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            responsible_user?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            status?: "open" | "closed" | undefined;
            invoicing_method?: "time_and_materials" | "fixed_price" | "non_invoiceable" | undefined;
            depends_on?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            dependency_for?: {
                id?: string | undefined;
                type?: string | undefined;
            }[] | undefined;
            actuals?: {
                billable_amount?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
                costs?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
                result?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
            } | undefined;
            budget?: {
                provided?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
                spent?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
                remaining?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
                allocated?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | null | undefined;
                forecasted?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | null | undefined;
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
    /** Create a new milestone */
    create(params: RequestBody<"LegacyMilestones.create">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Update an existing milestone */
    update(params: RequestBody<"LegacyMilestones.update">): Promise<void>;
    /** Delete a milestone */
    delete(params: RequestBody<"LegacyMilestones.delete">): Promise<void>;
    /** Close a milestone */
    close(params: RequestBody<"LegacyMilestones.close">): Promise<void>;
    /** Open (reopen) a milestone */
    open(params: RequestBody<"LegacyMilestones.open">): Promise<void>;
}
//# sourceMappingURL=legacy-milestones.d.ts.map