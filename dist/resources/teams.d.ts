import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class TeamsResource extends BaseResource {
    list(params?: RequestBody<"teams.list">): Promise<{
        data?: {
            id?: string | undefined;
            name?: string | undefined;
            team_lead?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            members?: {
                id?: string | undefined;
                type?: string | undefined;
            }[] | undefined;
        }[] | undefined;
    }>;
}
//# sourceMappingURL=teams.d.ts.map