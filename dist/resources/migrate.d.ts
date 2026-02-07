import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class MigrateResource extends BaseResource {
    id(params: RequestBody<"migrate.id">): Promise<{
        data?: {
            type?: "account" | "user" | "department" | "product" | "contact" | "company" | "deal" | "dealPhase" | "project" | "milestone" | "todo" | "event" | "ticket" | "invoice" | "creditNote" | "subscription" | "quotation" | "timeTracking" | "customField";
            id?: string;
        };
    }>;
    taxRate(params: RequestBody<"migrate.taxRate">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
    activityType(params: RequestBody<"migrate.activityType">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
}
//# sourceMappingURL=migrate.d.ts.map