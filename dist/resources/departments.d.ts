import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class DepartmentsResource extends BaseResource {
    list(params?: RequestBody<"departments.list">): Promise<{
        data?: {
            id?: string;
            name?: string;
            vat_number?: string;
            currency?: string;
            emails?: ({
                type?: string;
                email?: string;
            } & {
                type?: "primary" | "invoicing";
            })[];
            status?: "active" | "archived";
        }[];
    }>;
    info(params: RequestBody<"departments.info">): Promise<{
        data?: {
            id?: string;
            name?: string;
            vat_number?: string;
            address?: {
                line_1?: string | null;
                postal_code?: string | null;
                city?: string | null;
                country?: string;
                area_level_two?: ({
                    id?: string;
                    type?: string;
                } & {
                    type?: string;
                }) | null;
            };
            emails?: ({
                type?: string;
                email?: string;
            } & {
                type?: "primary" | "invoicing";
            })[];
            telephones?: {
                type?: "phone" | "mobile" | "fax";
                number?: string;
            }[];
            website?: string;
            currency?: string;
            iban?: string;
            bic?: string;
            fiscal_regime?: string | null;
            status?: "active" | "archived";
        };
    }>;
}
//# sourceMappingURL=departments.d.ts.map