import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class TagsResource extends BaseResource {
    list(params?: RequestBody<"tags.list">): Promise<{
        data?: {
            tag?: string | undefined;
        }[] | undefined;
    }>;
}
//# sourceMappingURL=tags.d.ts.map