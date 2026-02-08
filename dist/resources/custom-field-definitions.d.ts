import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class CustomFieldDefinitionsResource extends BaseResource {
    create(params: RequestBody<"customFieldDefinitions.create">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    list(params?: RequestBody<"customFieldDefinitions.list">): Promise<{
        data?: {
            id?: string | undefined;
            context?: ("contact" | "company" | "deal" | "project" | "milestone" | "product" | "invoice" | "subscription" | "ticket") | undefined;
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
    info(params: RequestBody<"customFieldDefinitions.info">): Promise<{
        data?: {
            id?: string | undefined;
            context?: ("contact" | "company" | "deal" | "project" | "milestone" | "product" | "invoice" | "subscription" | "ticket") | undefined;
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