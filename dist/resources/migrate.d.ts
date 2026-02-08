import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class MigrateResource extends BaseResource {
    id(params: RequestBody<"migrate.id">): Promise<{
        data?: {
            type?: "account" | "user" | "department" | "product" | "contact" | "company" | "deal" | "dealPhase" | "project" | "milestone" | "todo" | "event" | "ticket" | "invoice" | "creditNote" | "subscription" | "quotation" | "timeTracking" | "customField" | undefined;
            id?: string | undefined;
        } | undefined;
    }>;
    taxRate(params: RequestBody<"migrate.taxRate">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    activityType(params: RequestBody<"migrate.activityType">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
}
//# sourceMappingURL=migrate.d.ts.map