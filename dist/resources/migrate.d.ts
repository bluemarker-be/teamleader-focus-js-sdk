import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class MigrateResource extends BaseResource {
    /** Migrate an old-style ID to a UUID */
    id(params: RequestBody<"migrate.id">): Promise<{
        data?: {
            type?: "account" | "user" | "department" | "product" | "contact" | "company" | "deal" | "dealPhase" | "project" | "milestone" | "todo" | "event" | "ticket" | "invoice" | "creditNote" | "subscription" | "quotation" | "timeTracking" | "customField" | undefined;
            id?: string | undefined;
        } | undefined;
    }>;
    /** Migrate an old-style tax rate to a UUID */
    taxRate(params: RequestBody<"migrate.taxRate">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Migrate an old-style activity type to a UUID */
    activityType(params: RequestBody<"migrate.activityType">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
}
//# sourceMappingURL=migrate.d.ts.map