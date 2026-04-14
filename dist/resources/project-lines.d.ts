import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
/** Project lines within Projects v2 */
export declare class ProjectLinesResource extends BaseResource {
    /** Get a list of project lines */
    list(params: RequestBody<"projectLines.list">): Promise<{
        data?: {
            line?: {
                type?: "nextgenTask" | "nextgenMaterial" | "nextgenProjectGroup" | undefined;
                id?: string | undefined;
            } | undefined;
            group?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
        }[] | undefined;
    }>;
    /** Add a project line to a group */
    addToGroup(params: RequestBody<"projectLines.addToGroup">): Promise<void>;
    /** Remove a project line from a group */
    removeFromGroup(params: RequestBody<"projectLines.removeFromGroup">): Promise<void>;
}
//# sourceMappingURL=project-lines.d.ts.map