import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class ProjectLinesResource extends BaseResource {
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
    addToGroup(params: RequestBody<"projectLines.addToGroup">): Promise<void>;
    removeFromGroup(params: RequestBody<"projectLines.removeFromGroup">): Promise<void>;
}
//# sourceMappingURL=project-lines.d.ts.map