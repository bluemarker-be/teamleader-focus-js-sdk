import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class IncomingCreditNotesResource extends BaseResource {
    add(params: RequestBody<"incomingCreditNotes.add">): Promise<{
        data?: {
            type?: string | undefined;
            id?: string | undefined;
        } | undefined;
    }>;
    info(params: RequestBody<"incomingCreditNotes.info">): Promise<{
        data?: {
            id?: string | undefined;
            title?: string | undefined;
            origin?: {
                type?: "user" | "peppolIncomingDocument" | undefined;
                id?: string | undefined;
            } | undefined;
            supplier?: {
                type?: "company" | "contact" | undefined;
                id?: string | undefined;
            } | null | undefined;
            document_number?: string | null | undefined;
            invoice_date?: string | null | undefined;
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
            } | undefined;
            file?: {
                type?: string | undefined;
                id?: string | undefined;
            } | null | undefined;
            payment_reference?: string | null | undefined;
            review_status?: "pending" | "approved" | "refused" | undefined;
            iban_number?: string | null | undefined;
            payment_status?: "unknown" | "paid" | "not_paid" | undefined;
        } | undefined;
    }>;
    update(params: RequestBody<"incomingCreditNotes.update">): Promise<void>;
    delete(params: RequestBody<"incomingCreditNotes.delete">): Promise<void>;
    approve(params: RequestBody<"incomingCreditNotes.approve">): Promise<void>;
    refuse(params: RequestBody<"incomingCreditNotes.refuse">): Promise<void>;
    markAsPendingReview(params: RequestBody<"incomingCreditNotes.markAsPendingReview">): Promise<void>;
    sendToBookkeeping(params: RequestBody<"incomingCreditNotes.sendToBookkeeping">): Promise<void>;
    listPayments(params: RequestBody<"incomingCreditNotes.listPayments">): Promise<{
        data?: {
            id?: string | undefined;
            payment?: {
                amount: number;
                currency: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            } | undefined;
            paid_at?: string | undefined;
            payment_method?: {
                type?: string | undefined;
                id?: string | undefined;
            } | null | undefined;
            remark?: string | null | undefined;
        }[] | undefined;
        meta?: {
            total?: {
                amount?: number | undefined;
            } | undefined;
        } | undefined;
    }>;
    registerPayment(params: RequestBody<"incomingCreditNotes.registerPayment">): Promise<{
        data?: {
            type?: string | undefined;
            id?: string | undefined;
        } | undefined;
    }>;
    removePayment(params: RequestBody<"incomingCreditNotes.removePayment">): Promise<void>;
    updatePayment(params: RequestBody<"incomingCreditNotes.updatePayment">): Promise<void>;
}
//# sourceMappingURL=incoming-credit-notes.d.ts.map