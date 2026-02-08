import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
/** Groups within Projects v2 */
export declare class ProjectGroupsResource extends BaseResource {
    /** Get a list of project groups */
    list(params: RequestBody<"projectGroups.list">): Promise<{
        data?: {
            id?: string | undefined;
            project?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            title?: string | undefined;
            color?: (("#00B2B2" | "#008A8C" | "#992600" | "#ED9E00" | "#D157D3" | "#A400B2" | "#0071F2" | "#004DA6" | "#64788F" | "#C0C0C4" | "#82828C" | "#1A1C20") & unknown) | undefined;
            billing_method?: "time_and_materials" | "fixed_price" | "parent_fixed_price" | "non_billable" | undefined;
            billing_status?: (("not_billable" | "not_billed" | "partially_billed" | "fully_billed") & unknown) | undefined;
            amount_billed?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
            fixed_amount_billed?: {
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
            calculated_price?: {
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
                assign_type?: "manual" | "auto_assigned" | "manual_and_auto_assigned" | undefined;
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
        }[] | undefined;
    }>;
    /** Get details for a single project group */
    info(params: RequestBody<"projectGroups.info">): Promise<{
        data?: {
            id?: string | undefined;
            project?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            title?: string | undefined;
            description?: string | null | undefined;
            color?: (("#00B2B2" | "#008A8C" | "#992600" | "#ED9E00" | "#D157D3" | "#A400B2" | "#0071F2" | "#004DA6" | "#64788F" | "#C0C0C4" | "#82828C" | "#1A1C20") & unknown) | undefined;
            billing_method?: "time_and_materials" | "fixed_price" | "parent_fixed_price" | "non_billable" | undefined;
            billing_status?: (("not_billable" | "not_billed" | "partially_billed" | "fully_billed") & unknown) | undefined;
            amount_billed?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
            fixed_amount_billed?: {
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
            calculated_price?: {
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
                assign_type?: "manual" | "auto_assigned" | "manual_and_auto_assigned" | undefined;
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
        } | undefined;
    }>;
    /** Create a new project group */
    create(params: RequestBody<"projectGroups.create">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Update a project group */
    update(params: RequestBody<"projectGroups.update">): Promise<void>;
    /** Duplicate a project group */
    duplicate(params: RequestBody<"projectGroups.duplicate">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Delete a project group */
    delete(params: RequestBody<"projectGroups.delete">): Promise<void>;
    /** Assign a user to a project group */
    assign(params: RequestBody<"projectGroups.assign">): Promise<void>;
    /** Unassign a user from a project group */
    unassign(params: RequestBody<"projectGroups.unassign">): Promise<void>;
}
//# sourceMappingURL=project-groups.d.ts.map