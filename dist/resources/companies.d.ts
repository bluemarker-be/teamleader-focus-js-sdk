import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class CompaniesResource extends BaseResource {
    /** Get a list of companies */
    list(params?: RequestBody<"companies.list">): Promise<{
        data?: {
            id?: string;
            name?: string;
            status?: "active" | "deactivated";
            business_type?: {
                id?: string;
                type?: string;
            } & {
                type?: string;
            };
            vat_number?: string;
            national_identification_number?: string;
            emails?: ({
                type?: string;
                email?: string;
            } & {
                type?: "primary" | "invoicing";
            })[];
            telephones?: {
                type: "phone" | "fax";
                number: string;
            }[];
            website?: string;
            primary_address?: {
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
            iban?: string;
            bic?: string;
            language?: string;
            preferred_currency?: string | null;
            payment_term?: {
                type?: "cash" | "end_of_month" | "after_invoice_date";
                days?: number;
            } | null;
            invoicing_preferences?: {
                electronic_invoicing_address?: string | null;
            };
            responsible_user?: {
                id?: string;
                type?: string;
            };
            added_at?: string;
            updated_at?: string;
            web_url?: string;
            tags?: string[];
            marketing_mails_consent?: boolean;
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
            price_list?: {
                type?: string;
                id?: string;
            };
        }[];
    }>;
    /** Get details for a single company */
    info(params: RequestBody<"companies.info">): Promise<{
        data?: {
            id?: string;
            name?: string;
            status?: "active" | "deactivated";
            business_type?: {
                id?: string;
                type?: string;
            } & {
                type?: string;
            };
            vat_number?: string;
            national_identification_number?: string;
            emails?: ({
                type?: string;
                email?: string;
            } & {
                type?: "primary" | "invoicing";
            })[];
            telephones?: {
                type: "phone" | "fax";
                number: string;
            }[];
            website?: string;
            addresses?: {
                type?: "primary" | "invoicing" | "delivery" | "visiting";
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
                } & {
                    addressee?: string;
                };
            }[];
            iban?: string;
            bic?: string;
            language?: string;
            preferred_currency?: string | null;
            payment_term?: {
                type?: "cash" | "end_of_month" | "after_invoice_date";
                days?: number;
            } | null;
            invoicing_preferences?: {
                electronic_invoicing_address?: string | null;
            };
            responsible_user?: {
                id?: string;
                type?: string;
            };
            remarks?: string;
            added_at?: string;
            updated_at?: string;
            web_url?: string;
            tags?: string[];
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
            marketing_mails_consent?: boolean;
            related_companies?: {
                id?: string;
                type?: string;
            }[];
            related_contacts?: {
                type?: string;
                id?: string;
                position?: string | null;
                secondary_position?: string | null;
                division?: string | null;
                is_decision_maker?: boolean;
            }[];
        };
    }>;
    /** Create a new company */
    add(params: RequestBody<"companies.add">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
    /** Update an existing company */
    update(params: RequestBody<"companies.update">): Promise<void>;
    /** Delete a company */
    delete(params: RequestBody<"companies.delete">): Promise<void>;
    /** Add tags to a company */
    tag(params: RequestBody<"companies.tag">): Promise<void>;
    /** Remove tags from a company */
    untag(params: RequestBody<"companies.untag">): Promise<void>;
}
//# sourceMappingURL=companies.d.ts.map