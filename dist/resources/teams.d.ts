import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class TeamsResource extends BaseResource {
    list(params?: RequestBody<"teams.list">): Promise<{
        data?: {
            id?: string;
            name?: string;
            team_lead?: {
                id?: string;
                type?: string;
            } | null;
            members?: {
                id?: string;
                type?: string;
            }[];
        }[];
    }>;
}
//# sourceMappingURL=teams.d.ts.map