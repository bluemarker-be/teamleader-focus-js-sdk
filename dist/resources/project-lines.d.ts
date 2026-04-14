import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
/** Project lines within Projects v2 */
export declare class ProjectLinesResource extends BaseResource {
    /** Iterate all projectLines — auto-paginates across every page. */
    list(params: RequestBody<"projectLines.list">, options?: {
        maxPages?: number;
    }): AsyncGenerator<{
        line?: {
            type?: "nextgenTask" | "nextgenMaterial" | "nextgenProjectGroup" | undefined;
            id?: string | undefined;
        } | undefined;
        group?: {
            id?: string | undefined;
            type?: string | undefined;
        } | null | undefined;
    }, void, undefined>;
    /** Add a project line to a group */
    addToGroup(params: RequestBody<"projectLines.addToGroup">): Promise<void>;
    /** Remove a project line from a group */
    removeFromGroup(params: RequestBody<"projectLines.removeFromGroup">): Promise<void>;
}
//# sourceMappingURL=project-lines.d.ts.map