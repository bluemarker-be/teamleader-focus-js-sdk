import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class DealSourcesResource extends BaseResource {
    list(params?: RequestBody<"dealSources.list">): Promise<{
        data?: {
            id?: string;
            name?: string;
        }[];
    }>;
}
//# sourceMappingURL=deal-sources.d.ts.map