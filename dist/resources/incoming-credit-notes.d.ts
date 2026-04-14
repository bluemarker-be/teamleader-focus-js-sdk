import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class IncomingCreditNotesResource extends BaseResource {
    /** Add a new incoming credit note */
    add(params: RequestBody<"incomingCreditNotes.add">): Promise<{
        data?: {
            type?: string | undefined;
            id?: string | undefined;
        } | undefined;
    }>;
    /** Get details for a single incoming credit note */
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
    /** Update an existing incoming credit note */
    update(params: RequestBody<"incomingCreditNotes.update">): Promise<void>;
    /** Delete an incoming credit note */
    delete(params: RequestBody<"incomingCreditNotes.delete">): Promise<void>;
    /** Approve an incoming credit note */
    approve(params: RequestBody<"incomingCreditNotes.approve">): Promise<void>;
    /** Refuse an incoming credit note */
    refuse(params: RequestBody<"incomingCreditNotes.refuse">): Promise<void>;
    /** Mark an incoming credit note as pending review */
    markAsPendingReview(params: RequestBody<"incomingCreditNotes.markAsPendingReview">): Promise<void>;
    /** Send an incoming credit note to bookkeeping */
    sendToBookkeeping(params: RequestBody<"incomingCreditNotes.sendToBookkeeping">): Promise<void>;
    /** Get a list of payments for an incoming credit note */
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
    /** Register a payment for an incoming credit note */
    registerPayment(params: RequestBody<"incomingCreditNotes.registerPayment">): Promise<{
        data?: {
            type?: string | undefined;
            id?: string | undefined;
        } | undefined;
    }>;
    /** Remove a payment from an incoming credit note */
    removePayment(params: RequestBody<"incomingCreditNotes.removePayment">): Promise<void>;
    /** Update a payment on an incoming credit note */
    updatePayment(params: RequestBody<"incomingCreditNotes.updatePayment">): Promise<void>;
}
//# sourceMappingURL=incoming-credit-notes.d.ts.map