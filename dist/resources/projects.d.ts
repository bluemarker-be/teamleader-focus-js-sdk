import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class ProjectsResource extends BaseResource {
    /** Get a list of projects */
    list(params?: RequestBody<"NextgenProjects.list">): Promise<{
        data?: {
            id?: string | undefined;
            project_key?: number | undefined;
            title?: string | undefined;
            description?: string | null | undefined;
            status?: "open" | "closed" | undefined;
            billing_method?: "time_and_materials" | "fixed_price" | "non_billable" | undefined;
            time_budget?: {
                value?: number | undefined;
                unit?: "seconds" | undefined;
            } | null | undefined;
            time_estimated?: {
                value?: number | undefined;
                unit?: "seconds" | undefined;
            } | null | undefined;
            time_tracked?: {
                value?: number | undefined;
                unit?: "seconds" | undefined;
            } | null | undefined;
            amount_billed?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
            amount_unbilled?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
            fixed_amount_billed?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
            amount_paid?: {
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
            start_date?: string | null | undefined;
            end_date?: string | null | undefined;
            company_entity?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            owners?: {
                id?: string | undefined;
                type?: string | undefined;
            }[] | undefined;
            color?: ("#00B2B2" | "#008A8C" | "#992600" | "#ED9E00" | "#D157D3" | "#A400B2" | "#0071F2" | "#004DA6" | "#64788F" | "#C0C0C4" | "#82828C" | "#1A1C20") | undefined;
            assignees?: {
                assignee?: {
                    type?: "user" | "team" | undefined;
                    id?: string | undefined;
                } | undefined;
                assign_type?: "manual" | "auto_assigned" | "manual_and_auto_assigned" | undefined;
            }[] | undefined;
            customers?: {
                type: "contact" | "company";
                id: string;
            }[] | undefined;
            deals?: {
                id?: string | undefined;
                type?: string | undefined;
            }[] | undefined;
            quotations?: {
                id?: string | undefined;
                type?: string | undefined;
            }[] | undefined;
            legacy_project?: {
                id?: string | undefined;
                type?: string | undefined;
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
        }[] | undefined;
        meta?: {
            page?: {
                size?: number | undefined;
                number?: number | undefined;
            } | undefined;
            matches?: number | undefined;
        } | undefined;
    }>;
    /** Get details for a single project */
    info(params: RequestBody<"NextgenProjects.info">): Promise<{
        data?: {
            id?: string | undefined;
            project_key?: number | undefined;
            title?: string | undefined;
            description?: string | null | undefined;
            status?: "open" | "closed" | undefined;
            update_rights?: "owners" | "owners_and_assignees" | "everyone" | undefined;
            billing_method?: "time_and_materials" | "fixed_price" | "non_billable" | undefined;
            time_budget?: {
                value?: number | undefined;
                unit?: "seconds" | undefined;
            } | null | undefined;
            time_tracked?: {
                value?: number | undefined;
                unit?: "seconds" | undefined;
            } | null | undefined;
            amount_billed?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
            fixed_amount_billed?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
            amount_paid?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
            external_budget?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
            task_external_budget_spent?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null | undefined;
            material_external_budget_spent?: {
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
            start_date?: string | null | undefined;
            end_date?: string | null | undefined;
            purchase_order_number?: string | null | undefined;
            company_entity?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            owners?: {
                id?: string | undefined;
                type?: string | undefined;
            }[] | undefined;
            color?: ("#00B2B2" | "#008A8C" | "#992600" | "#ED9E00" | "#D157D3" | "#A400B2" | "#0071F2" | "#004DA6" | "#64788F" | "#C0C0C4" | "#82828C" | "#1A1C20") | undefined;
            assignees?: {
                assignee?: {
                    type?: "user" | "team" | undefined;
                    id?: string | undefined;
                } | undefined;
                assign_type?: "manual" | "auto_assigned" | "manual_and_auto_assigned" | undefined;
            }[] | undefined;
            customers?: {
                type: "contact" | "company";
                id: string;
            }[] | undefined;
            deals?: {
                id?: string | undefined;
                type?: string | undefined;
            }[] | undefined;
            quotations?: {
                id?: string | undefined;
                type?: string | undefined;
            }[] | undefined;
            custom_user_rates?: {
                user?: {
                    id?: string | undefined;
                    type?: string | undefined;
                } | undefined;
                custom_rate?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                } | undefined;
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
            legacy_project?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            external_parties?: {
                id?: string | undefined;
                customer?: {
                    type: "contact" | "company";
                    id: string;
                } | undefined;
                function?: string | undefined;
                sub_function?: string | undefined;
            }[] | undefined;
        } | undefined;
    }>;
    /** Create a new project */
    create(params: RequestBody<"NextgenProjects.create">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Update an existing project */
    update(params: RequestBody<"NextgenProjects.update">): Promise<void>;
    /** Close a project */
    close(params: RequestBody<"NextgenProjects.close">): Promise<void>;
    /** Reopen a closed project */
    reopen(params: RequestBody<"NextgenProjects.reopen">): Promise<void>;
    /** Duplicate a project */
    duplicate(params: RequestBody<"NextgenProjects.duplicate">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Delete a project */
    delete(params: RequestBody<"NextgenProjects.delete">): Promise<void>;
    /** Add an owner to a project */
    addOwner(params: RequestBody<"NextgenProjects.addOwner">): Promise<void>;
    /** Remove an owner from a project */
    removeOwner(params: RequestBody<"NextgenProjects.removeOwner">): Promise<void>;
    /** Assign a user to a project */
    assign(params: RequestBody<"NextgenProjects.assign">): Promise<void>;
    /** Unassign a user from a project */
    unassign(params: RequestBody<"NextgenProjects.unassign">): Promise<void>;
    /** Add a customer to a project */
    addCustomer(params: RequestBody<"NextgenProjects.addCustomer">): Promise<void>;
    /** Remove a customer from a project */
    removeCustomer(params: RequestBody<"NextgenProjects.removeCustomer">): Promise<void>;
    /** Link a deal to a project */
    addDeal(params: RequestBody<"NextgenProjects.addDeal">): Promise<void>;
    /** Unlink a deal from a project */
    removeDeal(params: RequestBody<"NextgenProjects.removeDeal">): Promise<void>;
    /** Link a quotation to a project */
    addQuotation(params: RequestBody<"NextgenProjects.addQuotation">): Promise<void>;
    /** Unlink a quotation from a project */
    removeQuotation(params: RequestBody<"NextgenProjects.removeQuotation">): Promise<void>;
}
//# sourceMappingURL=projects.d.ts.map