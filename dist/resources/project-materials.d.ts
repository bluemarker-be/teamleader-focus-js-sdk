import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
/** Materials within Projects v2 */
export declare class ProjectMaterialsResource extends BaseResource {
    /** Iterate all NextgenProjectsMaterials — auto-paginates across every page. */
    list(params?: RequestBody<"NextgenProjectsMaterials.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        project?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
        group?: {
            id?: string | undefined;
            type?: string | undefined;
        } | null | undefined;
        title?: string | undefined;
        status?: "to_do" | "in_progress" | "on_hold" | "done" | undefined;
        billing_method?: "fixed_price" | "unit_price" | "non_billable" | "parent_fixed_price" | undefined;
        billing_status?: ("not_billable" | "not_billed" | "partially_billed" | "fully_billed") | undefined;
        quantity?: number | null | undefined;
        quantity_estimated?: number | null | undefined;
        unit_price?: {
            amount: number;
            currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
        } | null | undefined;
        unit_cost?: {
            amount: number;
            currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
        } | null | undefined;
        unit?: {
            id?: string | undefined;
            type?: string | undefined;
        } | null | undefined;
        amount_billed?: {
            amount: number;
            currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
        } | null | undefined;
        external_budget?: {
            amount: number;
            currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
        } | null | undefined;
        external_budget_spent?: {
            amount: number;
            currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
        } | null | undefined;
        internal_budget?: {
            amount: number;
            currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
        } | null | undefined;
        price?: {
            amount: number;
            currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
        } | null | undefined;
        fixed_price?: {
            amount: number;
            currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
        } | null | undefined;
        cost?: {
            amount: number;
            currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
        } | null | undefined;
        margin?: {
            amount: number;
            currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
        } | null | undefined;
        margin_percentage?: number | null | undefined;
        assignees?: {
            assignee?: {
                type?: "user" | "team" | undefined;
                id?: string | undefined;
            } | undefined;
            assign_type?: "manual" | undefined;
        }[] | undefined;
        start_date?: string | null | undefined;
        end_date?: string | null | undefined;
        product?: {
            id?: string | undefined;
            type?: string | undefined;
        } | null | undefined;
    }, void, undefined>;
    /** Get details for a single project material */
    info(params: RequestBody<"NextgenProjectsMaterials.info">): Promise<{
        data?: {
            id?: string | undefined;
            project?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            group?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            title?: string | undefined;
            description?: string | null | undefined;
            status?: "to_do" | "in_progress" | "on_hold" | "done" | undefined;
            billing_method?: "fixed_price" | "unit_price" | "non_billable" | "parent_fixed_price" | undefined;
            billing_status?: ("not_billable" | "not_billed" | "partially_billed" | "fully_billed") | undefined;
            quantity?: number | null | undefined;
            quantity_estimated?: number | null | undefined;
            unit_price?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
            unit_cost?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
            unit?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            amount_billed?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
            external_budget?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
            external_budget_spent?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
            internal_budget?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
            price?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
            fixed_price?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
            cost?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
            margin?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
            margin_percentage?: number | null | undefined;
            assignees?: {
                assignee?: {
                    type?: "user" | "team" | undefined;
                    id?: string | undefined;
                } | undefined;
                assign_type?: "manual" | undefined;
            }[] | undefined;
            start_date?: string | null | undefined;
            end_date?: string | null | undefined;
            product?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
        } | undefined;
    }>;
    /** Create a new project material */
    create(params: RequestBody<"NextgenProjectsMaterials.create">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Update an existing project material */
    update(params: RequestBody<"NextgenProjectsMaterials.update">): Promise<void>;
    /** Duplicate a project material */
    duplicate(params: RequestBody<"NextgenProjectsMaterials.duplicate">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Delete a project material */
    delete(params: RequestBody<"NextgenProjectsMaterials.delete">): Promise<void>;
    /** Assign a user to a project material */
    assign(params: RequestBody<"NextgenProjectsMaterials.assign">): Promise<void>;
    /** Unassign a user from a project material */
    unassign(params: RequestBody<"NextgenProjectsMaterials.unassign">): Promise<void>;
}
//# sourceMappingURL=project-materials.d.ts.map