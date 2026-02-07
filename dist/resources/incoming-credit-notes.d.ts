import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class IncomingCreditNotesResource extends BaseResource {
    add(params: RequestBody<"incomingCreditNotes.add">): Promise<{
        data?: {
            type?: string;
            id?: string;
        };
    }>;
    info(params: RequestBody<"incomingCreditNotes.info">): Promise<{
        data?: {
            id?: string;
            title?: string;
            origin?: {
                type?: "user" | "peppolIncomingDocument";
                id?: string;
            };
            supplier?: {
                type?: "company" | "contact";
                id?: string;
            } | null;
            document_number?: string | null;
            invoice_date?: string | null;
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
            };
            file?: {
                type?: string;
                id?: string;
            } | null;
            payment_reference?: string | null;
            review_status?: "pending" | "approved" | "refused";
            iban_number?: string | null;
        };
    }>;
    update(params: RequestBody<"incomingCreditNotes.update">): Promise<void>;
    delete(params: RequestBody<"incomingCreditNotes.delete">): Promise<void>;
    approve(params: RequestBody<"incomingCreditNotes.approve">): Promise<void>;
    refuse(params: RequestBody<"incomingCreditNotes.refuse">): Promise<void>;
    markAsPendingReview(params: RequestBody<"incomingCreditNotes.markAsPendingReview">): Promise<void>;
    sendToBookkeeping(params: RequestBody<"incomingCreditNotes.sendToBookkeeping">): Promise<void>;
}
//# sourceMappingURL=incoming-credit-notes.d.ts.map