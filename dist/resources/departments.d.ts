import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class DepartmentsResource extends BaseResource {
    list(params?: RequestBody<"departments.list">): Promise<{
        data?: {
            id?: string | undefined;
            name?: string | undefined;
            vat_number?: string | undefined;
            currency?: string | undefined;
            emails?: {
                type?: "primary" | "invoicing" | undefined;
                email?: string | undefined;
            }[] | undefined;
            status?: "active" | "archived" | undefined;
        }[] | undefined;
    }>;
    info(params: RequestBody<"departments.info">): Promise<{
        data?: {
            id?: string | undefined;
            name?: string | undefined;
            vat_number?: string | undefined;
            address?: {
                line_1?: string | null | undefined;
                postal_code?: string | null | undefined;
                city?: string | null | undefined;
                country?: string | undefined;
                area_level_two?: {
                    id?: string | undefined;
                    type?: string | undefined;
                } | null | undefined;
            } | undefined;
            emails?: {
                type?: "primary" | "invoicing" | undefined;
                email?: string | undefined;
            }[] | undefined;
            telephones?: {
                type?: "phone" | "mobile" | "fax" | undefined;
                number?: string | undefined;
            }[] | undefined;
            website?: string | undefined;
            currency?: string | undefined;
            iban?: string | undefined;
            bic?: string | undefined;
            fiscal_regime?: string | null | undefined;
            status?: "active" | "archived" | undefined;
        } | undefined;
    }>;
}
//# sourceMappingURL=departments.d.ts.map