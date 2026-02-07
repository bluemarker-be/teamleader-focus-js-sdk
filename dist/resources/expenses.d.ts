import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class ExpensesResource extends BaseResource {
    list(params?: RequestBody<"expenses.list">): Promise<{
        data?: {
            source?: {
                type?: "incomingInvoice" | "incomingCreditNote" | "receipt";
                id?: string;
            };
            origin?: {
                type?: "user" | "peppolIncomingDocument";
                id?: string;
            };
            title?: string;
            supplier?: {
                type?: "company" | "contact";
                id?: string;
            } | null;
            document_number?: string | null;
            document_date?: string | null;
            due_date?: string | null;
            currency?: {
                code?: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            };
            total?: {
                tax_exclusive?: {
                    amount?: number;
                } | null;
                tax_inclusive?: {
                    amount?: number;
                } | null;
            };
            company_entity?: {
                type?: string;
                id?: string;
            } | null;
            file?: {
                type?: string;
                id?: string;
            } | null;
            payment_reference?: string | null;
            review_status?: "pending" | "approved" | "refused";
            bookkeeping_status?: "not_sent" | "sent";
            iban_number?: string | null;
        }[];
        meta?: {
            page?: {
                size?: number;
                number?: number;
            };
            matches?: number;
        } & unknown;
    }>;
}
//# sourceMappingURL=expenses.d.ts.map