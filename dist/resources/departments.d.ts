import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class DepartmentsResource extends BaseResource {
    /** Iterate all departments — auto-paginates across every page. */
    list(params?: RequestBody<"departments.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        name?: string | undefined;
        vat_number?: string | undefined;
        currency?: string | undefined;
        emails?: {
            type?: "primary" | "invoicing" | undefined;
            email?: string | undefined;
        }[] | undefined;
        status?: "active" | "archived" | undefined;
    }, void, undefined>;
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
            fiscal_regime?: "RF01" | "RF02" | "RF03" | "RF04" | "RF05" | "RF06" | "RF07" | "RF08" | "RF09" | "RF10" | "RF11" | "RF12" | "RF13" | "RF14" | "RF15" | "RF16" | "RF17" | "RF18" | "RF19" | null | undefined;
            status?: "active" | "archived" | undefined;
        } | undefined;
    }>;
}
//# sourceMappingURL=departments.d.ts.map