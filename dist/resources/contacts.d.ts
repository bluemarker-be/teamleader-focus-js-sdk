import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class ContactsResource extends BaseResource {
    /** Get a list of contacts */
    list(params?: RequestBody<"contacts.list">): Promise<{
        data?: {
            id?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            status?: "active" | "deactivated" | undefined;
            salutation?: string | undefined;
            emails?: {
                type?: "primary" | undefined;
                email?: string | undefined;
            }[] | undefined;
            telephones?: {
                type?: "phone" | "mobile" | "fax" | undefined;
                number?: string | undefined;
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
            gender?: (string & ("female" | "male" | "non_binary" | "prefers_not_to_say" | "unknown")) | null | undefined;
            birthdate?: string | undefined;
            iban?: string | undefined;
            bic?: string | undefined;
            national_identification_number?: string | undefined;
            language?: string | undefined;
            payment_term?: {
                type?: "cash" | "end_of_month" | "after_invoice_date" | undefined;
                days?: number | undefined;
            } | null | undefined;
            invoicing_preferences?: {
                electronic_invoicing_address?: string | null | undefined;
            } | undefined;
            tags?: string[] | undefined;
            added_at?: string | undefined;
            updated_at?: string | undefined;
            web_url?: string | undefined;
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
            } | undefined;
        }[] | undefined;
    }>;
    /** Get details for a single contact */
    info(params: RequestBody<"contacts.info">): Promise<{
        data?: {
            id?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            status?: "active" | undefined;
            salutation?: string | undefined;
            vat_number?: string | null | undefined;
            emails?: {
                type?: "primary" | undefined;
                email?: string | undefined;
            }[] | undefined;
            telephones?: {
                type?: "phone" | "mobile" | "fax" | undefined;
                number?: string | undefined;
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
            gender?: (string & ("female" | "male" | "non_binary" | "prefers_not_to_say" | "unknown")) | null | undefined;
            birthdate?: string | undefined;
            iban?: string | undefined;
            bic?: string | undefined;
            national_identification_number?: string | undefined;
            companies?: {
                position?: string | undefined;
                secondary_position?: string | undefined;
                division?: string | undefined;
                decision_maker?: boolean | undefined;
                company?: {
                    id?: string | undefined;
                    type?: string | undefined;
                } | undefined;
            }[] | undefined;
            language?: string | undefined;
            payment_term?: {
                type?: "cash" | "end_of_month" | "after_invoice_date" | undefined;
                days?: number | undefined;
            } | null | undefined;
            invoicing_preferences?: {
                electronic_invoicing_address?: string | null | undefined;
            } | undefined;
            remarks?: string | undefined;
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
            added_at?: string | undefined;
            updated_at?: string | undefined;
            web_url?: string | undefined;
        } | undefined;
    }>;
    /** Create a new contact */
    add(params: RequestBody<"contacts.add">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Update an existing contact */
    update(params: RequestBody<"contacts.update">): Promise<void>;
    /** Delete a contact */
    delete(params: RequestBody<"contacts.delete">): Promise<void>;
    /** Add tags to a contact */
    tag(params: RequestBody<"contacts.tag">): Promise<void>;
    /** Remove tags from a contact */
    untag(params: RequestBody<"contacts.untag">): Promise<void>;
    /** Link a contact to a company */
    linkToCompany(params: RequestBody<"contacts.linkToCompany">): Promise<void>;
    /** Unlink a contact from a company */
    unlinkFromCompany(params: RequestBody<"contacts.unlinkFromCompany">): Promise<void>;
    /** Update the link between a contact and a company */
    updateCompanyLink(params: RequestBody<"contacts.updateCompanyLink">): Promise<void>;
    /** Upload or remove a contact's avatar (base64-encoded image or null) */
    uploadAvatar(params: RequestBody<"contacts.uploadAvatar">): Promise<void>;
}
//# sourceMappingURL=contacts.d.ts.map