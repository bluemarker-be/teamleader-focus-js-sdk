import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class CustomFieldDefinitionsResource extends BaseResource {
    create(params: RequestBody<"customFieldDefinitions.create">): Promise<{
        data?: {
            id?: string;
            type?: string;
        } & {
            type?: string;
        };
    }>;
    list(params?: RequestBody<"customFieldDefinitions.list">): Promise<{
        data?: {
            id?: string;
            context?: ("contact" | "company" | "deal" | "project" | "milestone" | "product" | "invoice" | "subscription" | "ticket") & unknown;
            type?: "single_line" | "multi_line" | "single_select" | "multi_select" | "date" | "money" | "auto_increment" | "integer" | "number" | "boolean" | "email" | "telephone" | "url" | "company" | "contact" | "product" | "user";
            label?: string;
            group?: string;
            required?: boolean;
            configuration?: {
                options?: {
                    id?: string;
                    value?: string;
                }[];
                extra_option_allowed?: boolean;
            };
        }[];
    }>;
    info(params: RequestBody<"customFieldDefinitions.info">): Promise<{
        data?: {
            id?: string;
            context?: ("contact" | "company" | "deal" | "project" | "milestone" | "product" | "invoice" | "subscription" | "ticket") & unknown;
            type?: "single_line" | "multi_line" | "single_select" | "multi_select" | "date" | "money" | "auto_increment" | "integer" | "number" | "boolean" | "email" | "telephone" | "url" | "company" | "contact" | "product" | "user";
            label?: string;
            group?: string;
            required?: boolean;
            configuration?: {
                options?: {
                    id?: string;
                    value?: string;
                }[];
                extra_option_allowed?: boolean;
            };
        };
    }>;
}
//# sourceMappingURL=custom-field-definitions.d.ts.map