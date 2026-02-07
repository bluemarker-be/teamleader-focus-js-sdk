import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class ReceiptsResource extends BaseResource {
    add(params: RequestBody<"receipts.add">): Promise<{
        data?: {
            type?: string;
            id?: string;
        };
    }>;
    info(params: RequestBody<"receipts.info">): Promise<{
        data?: {
            id?: string;
            title?: string;
            origin?: {
                type?: string;
                id?: string;
            };
            supplier?: {
                type?: "company" | "contact";
                id?: string;
            } | null;
            document_number?: string | null;
            receipt_date?: string | null;
            currency?: {
                code?: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            };
            total?: {
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
            review_status?: "pending" | "approved" | "refused";
        };
    }>;
    update(params: RequestBody<"receipts.update">): Promise<void>;
    delete(params: RequestBody<"receipts.delete">): Promise<void>;
    approve(params: RequestBody<"receipts.approve">): Promise<void>;
    refuse(params: RequestBody<"receipts.refuse">): Promise<void>;
    markAsPendingReview(params: RequestBody<"receipts.markAsPendingReview">): Promise<void>;
    sendToBookkeeping(params: RequestBody<"receipts.sendToBookkeeping">): Promise<void>;
}
//# sourceMappingURL=receipts.d.ts.map