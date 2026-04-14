import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class IncomingInvoicesResource extends BaseResource {
    /** Add a new incoming invoice */
    add(params: RequestBody<"incomingInvoices.add">): Promise<{
        data?: {
            type?: string | undefined;
            id?: string | undefined;
        } | undefined;
    }>;
    /** Get details for a single incoming invoice */
    info(params: RequestBody<"incomingInvoices.info">): Promise<{
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
            payment_status?: "unknown" | "paid" | "partially_paid" | "not_paid" | undefined;
        } | undefined;
    }>;
    /** Update an existing incoming invoice */
    update(params: RequestBody<"incomingInvoices.update">): Promise<void>;
    /** Delete an incoming invoice */
    delete(params: RequestBody<"incomingInvoices.delete">): Promise<void>;
    /** Approve an incoming invoice */
    approve(params: RequestBody<"incomingInvoices.approve">): Promise<void>;
    /** Refuse an incoming invoice */
    refuse(params: RequestBody<"incomingInvoices.refuse">): Promise<void>;
    /** Mark an incoming invoice as pending review */
    markAsPendingReview(params: RequestBody<"incomingInvoices.markAsPendingReview">): Promise<void>;
    /** Send an incoming invoice to bookkeeping */
    sendToBookkeeping(params: RequestBody<"incomingInvoices.sendToBookkeeping">): Promise<void>;
    /** Get a list of payments for an incoming invoice */
    listPayments(params: RequestBody<"incomingInvoices.listPayments">): Promise<{
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
    /** Register a payment for an incoming invoice */
    registerPayment(params: RequestBody<"incomingInvoices.registerPayment">): Promise<{
        data?: {
            type?: string | undefined;
            id?: string | undefined;
        } | undefined;
    }>;
    /** Remove a payment from an incoming invoice */
    removePayment(params: RequestBody<"incomingInvoices.removePayment">): Promise<void>;
    /** Update a payment on an incoming invoice */
    updatePayment(params: RequestBody<"incomingInvoices.updatePayment">): Promise<void>;
}
//# sourceMappingURL=incoming-invoices.d.ts.map