import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class NotesResource extends BaseResource {
    list(params: RequestBody<"notes.list">): Promise<void>;
    create(params: RequestBody<"notes.create">): Promise<{
        data?: {
            id?: string;
            type?: string;
        };
    }>;
    update(params: RequestBody<"notes.update">): Promise<void>;
}
//# sourceMappingURL=notes.d.ts.map