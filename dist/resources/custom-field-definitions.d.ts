import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class CustomFieldDefinitionsResource extends BaseResource {
    /** Create a new custom field definition */
    create(params: RequestBody<"customFieldDefinitions.create">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Get a list of custom field definitions */
    list(params?: RequestBody<"customFieldDefinitions.list">): Promise<{
        data?: {
            id?: string | undefined;
            context?: ("contact" | "company" | "sale" | "project" | "milestone" | "product" | "invoice" | "subscription" | "ticket" | "meeting" | "todo" | "callback" | "meeting_report" | "pro_external_cost" | "werkbonnen") | undefined;
            type?: "single_line" | "multi_line" | "single_select" | "multi_select" | "date" | "money" | "auto_increment" | "integer" | "number" | "boolean" | "email" | "telephone" | "url" | "company" | "contact" | "product" | "user" | undefined;
            label?: string | undefined;
            group?: string | undefined;
            required?: boolean | undefined;
            configuration?: {
                options?: {
                    id?: string | undefined;
                    value?: string | undefined;
                }[] | undefined;
                extra_option_allowed?: boolean | undefined;
            } | undefined;
        }[] | undefined;
    }>;
    /** Get details for a single custom field definition */
    info(params: RequestBody<"customFieldDefinitions.info">): Promise<{
        data?: {
            id?: string | undefined;
            context?: ("contact" | "company" | "sale" | "project" | "milestone" | "product" | "invoice" | "subscription" | "ticket" | "meeting" | "todo" | "callback" | "meeting_report" | "pro_external_cost" | "werkbonnen") | undefined;
            type?: "single_line" | "multi_line" | "single_select" | "multi_select" | "date" | "money" | "auto_increment" | "integer" | "number" | "boolean" | "email" | "telephone" | "url" | "company" | "contact" | "product" | "user" | undefined;
            label?: string | undefined;
            group?: string | undefined;
            required?: boolean | undefined;
            configuration?: {
                options?: {
                    id?: string | undefined;
                    value?: string | undefined;
                }[] | undefined;
                extra_option_allowed?: boolean | undefined;
            } | undefined;
        } | undefined;
    }>;
}
//# sourceMappingURL=custom-field-definitions.d.ts.map