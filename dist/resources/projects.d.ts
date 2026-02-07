import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class ProjectsResource extends BaseResource {
    /** Get a list of projects */
    list(params?: RequestBody<"NextgenProjects.list">): Promise<{
        data?: {
            id?: string;
            project_key?: number;
            title?: string;
            description?: string | null;
            status?: "open" | "closed";
            billing_method?: "time_and_materials" | "fixed_price" | "non_billable";
            time_budget?: ({
                value?: number;
                unit?: string;
            } & {
                unit?: "seconds";
            }) | null;
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
            amount_billed?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            amount_unbilled?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            fixed_amount_billed?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            amount_paid?: {
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
            fixed_price?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            calculated_price?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            cost?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            margin?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            margin_percentage?: number | null;
            start_date?: string | null;
            end_date?: string | null;
            company_entity?: {
                id?: string;
                type?: string;
            } | null;
            owners?: {
                id?: string;
                type?: string;
            }[];
            color?: ("#00B2B2" | "#008A8C" | "#992600" | "#ED9E00" | "#D157D3" | "#A400B2" | "#0071F2" | "#004DA6" | "#64788F" | "#C0C0C4" | "#82828C" | "#1A1C20") & unknown;
            assignees?: {
                assignee?: {
                    type?: string;
                    id?: string;
                } & {
                    type?: "team" | "user";
                };
                assign_type?: "manual" | "auto_assigned" | "manual_and_auto_assigned";
            }[];
            customers?: {
                type: "contact" | "company";
                id: string;
            }[];
            deals?: {
                id?: string;
                type?: string;
            }[];
            quotations?: {
                id?: string;
                type?: string;
            }[];
            legacy_project?: ({
                id?: string;
                type?: string;
            } & {
                type?: string;
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
        }[];
        meta?: {
            page?: {
                size?: number;
                number?: number;
            };
            matches?: number;
        } & unknown;
    }>;
    /** Get details for a single project */
    info(params: RequestBody<"NextgenProjects.info">): Promise<{
        data?: {
            id?: string;
            project_key?: number;
            title?: string;
            description?: string | null;
            status?: "open" | "closed";
            update_rights?: "owners" | "owners_and_assignees" | "everyone";
            billing_method?: "time_and_materials" | "fixed_price" | "non_billable";
            time_budget?: ({
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
            amount_billed?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            fixed_amount_billed?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            amount_paid?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            external_budget?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            task_external_budget_spent?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            material_external_budget_spent?: {
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
            fixed_price?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            calculated_price?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            cost?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            margin?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | null;
            margin_percentage?: number | null;
            start_date?: string | null;
            end_date?: string | null;
            purchase_order_number?: string | null;
            company_entity?: {
                id?: string;
                type?: string;
            } | null;
            owners?: {
                id?: string;
                type?: string;
            }[];
            color?: ("#00B2B2" | "#008A8C" | "#992600" | "#ED9E00" | "#D157D3" | "#A400B2" | "#0071F2" | "#004DA6" | "#64788F" | "#C0C0C4" | "#82828C" | "#1A1C20") & unknown;
            assignees?: {
                assignee?: {
                    type?: string;
                    id?: string;
                } & {
                    type?: "team" | "user";
                };
                assign_type?: "manual" | "auto_assigned" | "manual_and_auto_assigned";
            }[];
            customers?: {
                type: "contact" | "company";
                id: string;
            }[];
            deals?: {
                id?: string;
                type?: string;
            }[];
            quotations?: {
                id?: string;
                type?: string;
            }[];
            custom_user_rates?: {
                user?: {
                    id?: string;
                    type?: string;
                };
                custom_rate?: {
                    amount: number;
                    currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
                };
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
            legacy_project?: ({
                id?: string;
                type?: string;
            } & {
                type?: string;
            }) | null;
            external_parties?: {
                id?: string;
                customer?: {
                    type: "contact" | "company";
                    id: string;
                };
                function?: string;
                sub_function?: string;
            }[];
        };
    }>;
    /** Create a new project */
    create(params: RequestBody<"NextgenProjects.create">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
    /** Update an existing project */
    update(params: RequestBody<"NextgenProjects.update">): Promise<void>;
    /** Close a project */
    close(params: RequestBody<"NextgenProjects.close">): Promise<void>;
    /** Reopen a closed project */
    reopen(params: RequestBody<"NextgenProjects.reopen">): Promise<void>;
    /** Delete a project */
    delete(params: RequestBody<"NextgenProjects.delete">): Promise<void>;
}
//# sourceMappingURL=projects.d.ts.map