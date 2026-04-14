import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class TeamsResource extends BaseResource {
    /** Iterate all teams — auto-paginates across every page. */
    list(params?: RequestBody<"teams.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
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
    }, void, undefined>;
}
//# sourceMappingURL=teams.d.ts.map