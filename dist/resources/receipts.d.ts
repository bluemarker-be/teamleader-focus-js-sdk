import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class ReceiptsResource extends BaseResource {
    /** Add a new receipt */
    add(params: RequestBody<"receipts.add">): Promise<{
        data?: {
            type?: string | undefined;
            id?: string | undefined;
        } | undefined;
    }>;
    /** Get details for a single receipt */
    info(params: RequestBody<"receipts.info">): Promise<{
        data?: {
            id?: string | undefined;
            title?: string | undefined;
            origin?: {
                type?: string | undefined;
                id?: string | undefined;
            } | undefined;
            supplier?: {
                type?: "company" | "contact" | undefined;
                id?: string | undefined;
            } | null | undefined;
            document_number?: string | null | undefined;
            receipt_date?: string | null | undefined;
            currency?: {
                code?: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR" | undefined;
            } | undefined;
            total?: {
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
            review_status?: "pending" | "approved" | "refused" | undefined;
            payment_status?: "unknown" | "paid" | "not_paid" | undefined;
        } | undefined;
    }>;
    /** Update an existing receipt */
    update(params: RequestBody<"receipts.update">): Promise<void>;
    /** Delete a receipt */
    delete(params: RequestBody<"receipts.delete">): Promise<void>;
    /** Approve a receipt */
    approve(params: RequestBody<"receipts.approve">): Promise<void>;
    /** Refuse a receipt */
    refuse(params: RequestBody<"receipts.refuse">): Promise<void>;
    /** Mark a receipt as pending review */
    markAsPendingReview(params: RequestBody<"receipts.markAsPendingReview">): Promise<void>;
    /** Send a receipt to bookkeeping */
    sendToBookkeeping(params: RequestBody<"receipts.sendToBookkeeping">): Promise<void>;
    /** Get a list of payments for a receipt */
    listPayments(params: RequestBody<"receipts.listPayments">): Promise<{
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
    /** Register a payment for a receipt */
    registerPayment(params: RequestBody<"receipts.registerPayment">): Promise<{
        data?: {
            type?: string | undefined;
            id?: string | undefined;
        } | undefined;
    }>;
    /** Remove a payment from a receipt */
    removePayment(params: RequestBody<"receipts.removePayment">): Promise<void>;
    /** Update a payment on a receipt */
    updatePayment(params: RequestBody<"receipts.updatePayment">): Promise<void>;
}
//# sourceMappingURL=receipts.d.ts.map