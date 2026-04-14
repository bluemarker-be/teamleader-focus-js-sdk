import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class ExpensesResource extends BaseResource {
    /** Iterate all expenses — auto-paginates across every page. */
    list(params?: RequestBody<"expenses.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        source?: {
            type?: "incomingInvoice" | "incomingCreditNote" | "receipt" | undefined;
            id?: string | undefined;
        } | undefined;
        origin?: {
            type?: "user" | "peppolIncomingDocument" | undefined;
            id?: string | undefined;
        } | undefined;
        title?: string | undefined;
        supplier?: {
            type?: "company" | "contact" | undefined;
            id?: string | undefined;
        } | null | undefined;
        document_number?: string | null | undefined;
        document_date?: string | null | undefined;
        due_date?: string | null | undefined;
        currency?: {
            code?: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR" | undefined;
        } | undefined;
        total?: {
            tax_exclusive?: {
                amount?: number | undefined;
            } | null | undefined;
            tax_inclusive?: {
                amount?: number | undefined;
            } | null | undefined;
        } | undefined;
        company_entity?: {
            type?: string | undefined;
            id?: string | undefined;
        } | null | undefined;
        file?: {
            type?: string | undefined;
            id?: string | undefined;
        } | null | undefined;
        payment_reference?: string | null | undefined;
        review_status?: "pending" | "approved" | "refused" | undefined;
        bookkeeping_status?: "not_sent" | "sent" | undefined;
        iban_number?: string | null | undefined;
        payment_status?: "unknown" | "paid" | "partially_paid" | "not_paid" | undefined;
        paid_amount?: number | null | undefined;
        paid_at?: string | null | undefined;
    }, void, undefined>;
}
//# sourceMappingURL=expenses.d.ts.map