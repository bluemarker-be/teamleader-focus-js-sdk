import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class ContactsResource extends BaseResource {
    /** Get a list of contacts */
    list(params?: RequestBody<"contacts.list">): Promise<{
        data?: {
            id?: string;
            first_name?: string;
            last_name?: string;
            status?: "active" | "deactivated";
            salutation?: string;
            emails?: ({
                type?: string;
                email?: string;
            } & {
                type?: "primary";
            })[];
            telephones?: {
                type?: "phone" | "mobile" | "fax";
                number?: string;
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
            gender?: (string & ("female" | "male" | "non_binary" | "prefers_not_to_say" | "unknown")) | null;
            birthdate?: string;
            iban?: string;
            bic?: string;
            national_identification_number?: string;
            language?: string;
            payment_term?: {
                type?: "cash" | "end_of_month" | "after_invoice_date";
                days?: number;
            } | null;
            invoicing_preferences?: {
                electronic_invoicing_address?: string | null;
            };
            tags?: string[];
            added_at?: string;
            updated_at?: string;
            web_url?: string;
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
    /** Get details for a single contact */
    info(params: RequestBody<"contacts.info">): Promise<{
        data?: {
            id?: string;
            first_name?: string;
            last_name?: string;
            status?: "active";
            salutation?: string;
            vat_number?: string | null;
            emails?: ({
                type?: string;
                email?: string;
            } & {
                type?: "primary";
            })[];
            telephones?: {
                type?: "phone" | "mobile" | "fax";
                number?: string;
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
            gender?: (string & ("female" | "male" | "non_binary" | "prefers_not_to_say" | "unknown")) | null;
            birthdate?: string;
            iban?: string;
            bic?: string;
            national_identification_number?: string;
            companies?: {
                position?: string;
                secondary_position?: string;
                division?: string;
                decision_maker?: boolean;
                company?: {
                    id?: string;
                    type?: string;
                };
            }[];
            language?: string;
            payment_term?: {
                type?: "cash" | "end_of_month" | "after_invoice_date";
                days?: number;
            } | null;
            invoicing_preferences?: {
                electronic_invoicing_address?: string | null;
            };
            remarks?: string;
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
            added_at?: string;
            updated_at?: string;
            web_url?: string;
        };
    }>;
    /** Create a new contact */
    add(params: RequestBody<"contacts.add">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
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
}
//# sourceMappingURL=contacts.d.ts.map