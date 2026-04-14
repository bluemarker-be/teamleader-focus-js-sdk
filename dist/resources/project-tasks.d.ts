import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
/** Tasks within Projects v2 (not to be confused with standalone Tasks) */
export declare class ProjectTasksResource extends BaseResource {
    /** Iterate all NextgenProjectsTasks — auto-paginates across every page. */
    list(params?: RequestBody<"NextgenProjectsTasks.list">, options?: {
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
        work_type?: {
            id?: string | undefined;
            type?: string | undefined;
        } | null | undefined;
        task_type?: {
            id?: string | undefined;
            type?: string | undefined;
        } | null | undefined;
        status?: "to_do" | "in_progress" | "on_hold" | "done" | undefined;
        title?: string | undefined;
        billing_method?: "user_rate" | "work_type_rate" | "custom_rate" | "fixed_price" | "parent_fixed_price" | "non_billable" | undefined;
        billing_status?: ("not_billable" | "not_billed" | "partially_billed" | "fully_billed") | undefined;
        custom_rate?: {
            amount: number;
            currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
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
        unit_price?: {
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
        unit_cost?: {
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
        time_estimated?: {
            value?: number | undefined;
            unit?: "seconds" | undefined;
        } | null | undefined;
        time_tracked?: {
            value?: number | undefined;
            unit?: "seconds" | undefined;
        } | null | undefined;
    }, void, undefined>;
    /** Get details for a single project task */
    info(params: RequestBody<"NextgenProjectsTasks.info">): Promise<{
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
            work_type?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            task_type?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            status?: "to_do" | "in_progress" | "on_hold" | "done" | undefined;
            title?: string | undefined;
            description?: string | null | undefined;
            billing_method?: "user_rate" | "work_type_rate" | "custom_rate" | "fixed_price" | "parent_fixed_price" | "non_billable" | undefined;
            billing_status?: ("not_billable" | "not_billed" | "partially_billed" | "fully_billed") | undefined;
            custom_rate?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
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
            unit_price?: {
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
            unit_cost?: {
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
            time_estimated?: {
                value?: number | undefined;
                unit?: "seconds" | undefined;
            } | null | undefined;
            time_tracked?: {
                value?: number | undefined;
                unit?: "seconds" | undefined;
            } | null | undefined;
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
    /** Create a new project task */
    create(params: RequestBody<"NextgenProjectsTasks.create">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Update an existing project task */
    update(params: RequestBody<"NextgenProjectsTasks.update">): Promise<void>;
    /** Duplicate a project task */
    duplicate(params: RequestBody<"NextgenProjectsTasks.duplicate">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Delete a project task */
    delete(params: RequestBody<"NextgenProjectsTasks.delete">): Promise<void>;
    /** Assign a user to a project task */
    assign(params: RequestBody<"NextgenProjectsTasks.assign">): Promise<void>;
    /** Unassign a user from a project task */
    unassign(params: RequestBody<"NextgenProjectsTasks.unassign">): Promise<void>;
}
//# sourceMappingURL=project-tasks.d.ts.map