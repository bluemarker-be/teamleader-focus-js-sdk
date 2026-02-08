import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class IncomingInvoicesResource extends BaseResource {
    add(params: RequestBody<"incomingInvoices.add">): Promise<{
        data?: {
            type?: string | undefined;
            id?: string | undefined;
        } | undefined;
    }>;
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
        } | undefined;
    }>;
    update(params: RequestBody<"incomingInvoices.update">): Promise<void>;
    delete(params: RequestBody<"incomingInvoices.delete">): Promise<void>;
    approve(params: RequestBody<"incomingInvoices.approve">): Promise<void>;
    refuse(params: RequestBody<"incomingInvoices.refuse">): Promise<void>;
    markAsPendingReview(params: RequestBody<"incomingInvoices.markAsPendingReview">): Promise<void>;
    sendToBookkeeping(params: RequestBody<"incomingInvoices.sendToBookkeeping">): Promise<void>;
}
//# sourceMappingURL=incoming-invoices.d.ts.map