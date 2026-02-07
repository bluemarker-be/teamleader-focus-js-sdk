import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
/** Tasks within Projects v2 (not to be confused with standalone Tasks) */
export declare class ProjectTasksResource extends BaseResource {
    list(params: RequestBody<"NextgenProjectsTasks.list">): Promise<{
        data?: {
            id?: string;
            project?: {
                id?: string;
                type?: string;
            };
            group?: ({
                id?: string;
                type?: string;
            } & {
                type?: unknown;
            }) | null;
            work_type?: ({
                id?: string;
                type?: string;
            } & {
                type?: unknown;
            }) | null;
            task_type?: ({
                id?: string;
                type?: string;
            } & {
                type?: unknown;
            }) | null;
            status?: "to_do" | "in_progress" | "on_hold" | "done";
            title?: string;
            billing_method?: "user_rate" | "work_type_rate" | "custom_rate" | "fixed_price" | "parent_fixed_price" | "non_billable";
            billing_status?: ("not_billable" | "not_billed" | "partially_billed" | "fully_billed") & unknown;
            custom_rate?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            amount_billed?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            external_budget?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            external_budget_spent?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            internal_budget?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            price?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            unit_price?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            fixed_price?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            cost?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            unit_cost?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            margin?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            margin_percentage?: number | null;
            assignees?: ({
                assignee?: {
                    type?: string;
                    id?: string;
                } & {
                    type?: "team" | "user";
                };
                assign_type?: "manual" | "auto_assigned" | "manual_and_auto_assigned";
            } & {
                assign_type?: "manual";
            })[];
            start_date?: string | null;
            end_date?: string | null;
            time_estimated?: ({
                value?: number;
                unit?: string;
            } & {
                unit?: "seconds";
            }) | null;
            time_tracked?: ({
                value?: number;
                unit?: string;
            } & {
                unit?: "seconds";
            }) | null;
        }[];
    }>;
    info(params: RequestBody<"NextgenProjectsTasks.info">): Promise<{
        data?: {
            id?: string;
            project?: {
                id?: string;
                type?: string;
            };
            group?: ({
                id?: string;
                type?: string;
            } & {
                type?: unknown;
            }) | null;
            work_type?: ({
                id?: string;
                type?: string;
            } & {
                type?: unknown;
            }) | null;
            task_type?: ({
                id?: string;
                type?: string;
            } & {
                type?: unknown;
            }) | null;
            status?: "to_do" | "in_progress" | "on_hold" | "done";
            title?: string;
            description?: string | null;
            billing_method?: "user_rate" | "work_type_rate" | "custom_rate" | "fixed_price" | "parent_fixed_price" | "non_billable";
            billing_status?: ("not_billable" | "not_billed" | "partially_billed" | "fully_billed") & unknown;
            custom_rate?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            amount_billed?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            external_budget?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            external_budget_spent?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            internal_budget?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            price?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            unit_price?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            fixed_price?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            cost?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            unit_cost?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            margin?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            margin_percentage?: number | null;
            assignees?: ({
                assignee?: {
                    type?: string;
                    id?: string;
                } & {
                    type?: "team" | "user";
                };
                assign_type?: "manual" | "auto_assigned" | "manual_and_auto_assigned";
            } & {
                assign_type?: "manual";
            })[];
            start_date?: string | null;
            end_date?: string | null;
            time_estimated?: ({
                value?: number;
                unit?: string;
            } & {
                unit?: "seconds";
            }) | null;
            time_tracked?: ({
                value?: number;
                unit?: string;
            } & {
                unit?: "seconds";
            }) | null;
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
        };
    }>;
    create(params: RequestBody<"NextgenProjectsTasks.create">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
    update(params: RequestBody<"NextgenProjectsTasks.update">): Promise<void>;
    duplicate(params: RequestBody<"NextgenProjectsTasks.duplicate">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
    delete(params: RequestBody<"NextgenProjectsTasks.delete">): Promise<void>;
    assign(params: RequestBody<"NextgenProjectsTasks.assign">): Promise<void>;
    unassign(params: RequestBody<"NextgenProjectsTasks.unassign">): Promise<void>;
}
//# sourceMappingURL=project-tasks.d.ts.map