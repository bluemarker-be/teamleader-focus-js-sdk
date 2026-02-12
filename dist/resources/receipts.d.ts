import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class ReceiptsResource extends BaseResource {
    add(params: RequestBody<"receipts.add">): Promise<{
        data?: {
            type?: string | undefined;
            id?: string | undefined;
        } | undefined;
    }>;
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
    update(params: RequestBody<"receipts.update">): Promise<void>;
    delete(params: RequestBody<"receipts.delete">): Promise<void>;
    approve(params: RequestBody<"receipts.approve">): Promise<void>;
    refuse(params: RequestBody<"receipts.refuse">): Promise<void>;
    markAsPendingReview(params: RequestBody<"receipts.markAsPendingReview">): Promise<void>;
    sendToBookkeeping(params: RequestBody<"receipts.sendToBookkeeping">): Promise<void>;
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
    registerPayment(params: RequestBody<"receipts.registerPayment">): Promise<{
        data?: {
            type?: string | undefined;
            id?: string | undefined;
        } | undefined;
    }>;
    removePayment(params: RequestBody<"receipts.removePayment">): Promise<void>;
    updatePayment(params: RequestBody<"receipts.updatePayment">): Promise<void>;
}
//# sourceMappingURL=receipts.d.ts.map