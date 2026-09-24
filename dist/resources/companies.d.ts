import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class CompaniesResource extends BaseResource {
    /** Iterate all companies — auto-paginates across every page. */
    list(params?: RequestBody<"companies.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        id?: string | undefined;
        name?: string | undefined;
        status?: "active" | "deactivated" | undefined;
        business_type?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
        vat_number?: string | undefined;
        national_identification_number?: string | undefined;
        emails?: {
            type?: "primary" | "invoicing" | undefined;
            email?: string | undefined;
        }[] | undefined;
        telephones?: {
            type: "phone" | "fax";
            number: string;
        }[] | undefined;
        website?: string | undefined;
        primary_address?: {
            line_1?: string | null | undefined;
            postal_code?: string | null | undefined;
            city?: string | null | undefined;
            country?: string | undefined;
            area_level_two?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
        } | undefined;
        iban?: string | undefined;
        bic?: string | undefined;
        language?: string | undefined;
        preferred_currency?: string | null | undefined;
        payment_term?: {
            type?: "cash" | "end_of_month" | "after_invoice_date" | undefined;
            days?: number | undefined;
        } | null | undefined;
        invoicing_preferences?: {
            electronic_invoicing_address?: string | null | undefined;
        } | undefined;
        responsible_user?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
        added_at?: string | undefined;
        updated_at?: string | undefined;
        web_url?: string | undefined;
        tags?: string[] | undefined;
        marketing_mails_consent?: boolean | undefined;
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
        price_list?: {
            type?: string | undefined;
            id?: string | undefined;
        } | null | undefined;
    }, void, undefined>;
    /** Get details for a single company */
    info(params: RequestBody<"companies.info">): Promise<{
        data?: {
            id?: string | undefined;
            name?: string | undefined;
            status?: "active" | "deactivated" | undefined;
            business_type?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            vat_number?: string | undefined;
            national_identification_number?: string | undefined;
            emails?: {
                type?: "primary" | "invoicing" | undefined;
                email?: string | undefined;
            }[] | undefined;
            telephones?: {
                type: "phone" | "fax";
                number: string;
            }[] | undefined;
            website?: string | undefined;
            addresses?: {
                type?: "primary" | "invoicing" | "delivery" | "visiting" | undefined;
                address?: {
                    line_1?: string | null | undefined;
                    postal_code?: string | null | undefined;
                    city?: string | null | undefined;
                    country?: string | undefined;
                    area_level_two?: {
                        id?: string | undefined;
                        type?: string | undefined;
                    } | null | undefined;
                    addressee?: string | undefined;
                } | undefined;
            }[] | undefined;
            iban?: string | undefined;
            bic?: string | undefined;
            language?: string | undefined;
            preferred_currency?: string | null | undefined;
            payment_term?: {
                type?: "cash" | "end_of_month" | "after_invoice_date" | undefined;
                days?: number | undefined;
            } | null | undefined;
            invoicing_preferences?: {
                electronic_invoicing_address?: string | null | undefined;
            } | undefined;
            responsible_user?: {
                id?: string | undefined;
                type?: string | undefined;
            } | undefined;
            remarks?: string | undefined;
            added_at?: string | undefined;
            updated_at?: string | undefined;
            web_url?: string | undefined;
            tags?: string[] | undefined;
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
            marketing_mails_consent?: boolean | undefined;
            related_companies?: {
                id?: string | undefined;
                type?: string | undefined;
            }[] | undefined;
            related_contacts?: {
                type?: string | undefined;
                id?: string | undefined;
                position?: string | null | undefined;
                secondary_position?: string | null | undefined;
                division?: string | null | undefined;
                is_decision_maker?: boolean | undefined;
            }[] | undefined;
            price_list?: {
                type?: string | undefined;
                id?: string | undefined;
            } | null | undefined;
        } | undefined;
    }>;
    /** Create a new company */
    add(params: RequestBody<"companies.add">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Update an existing company */
    update(params: RequestBody<"companies.update">): Promise<void>;
    /** Delete a company */
    delete(params: RequestBody<"companies.delete">): Promise<void>;
    /** Add tags to a company */
    tag(params: RequestBody<"companies.tag">): Promise<void>;
    /** Remove tags from a company */
    untag(params: RequestBody<"companies.untag">): Promise<void>;
    /** Upload or remove a company's logo (base64-encoded image or null) */
    uploadLogo(params: RequestBody<"companies.uploadLogo">): Promise<void>;
}
//# sourceMappingURL=companies.d.ts.map