import { BaseResource } from "./base.js";
export declare class AccountsResource extends BaseResource {
    /** Get the Projects v2 migration status for this account */
    projectsV2Status(): Promise<{
        data?: {
            status?: "projects-v2" | "legacy" | undefined;
            will_be_automatically_switched_on?: string | undefined;
        } | undefined;
    }>;
}
//# sourceMappingURL=accounts.d.ts.map