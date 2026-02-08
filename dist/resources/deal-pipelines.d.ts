import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class DealPipelinesResource extends BaseResource {
    /** Get a list of deal pipelines */
    list(params?: RequestBody<"dealPipelines.list">): Promise<{
        data?: {
            id?: string | undefined;
            name?: string | undefined;
        }[] | undefined;
        meta?: {
            page?: {
                size?: number | undefined;
                number?: number | undefined;
            } | undefined;
            matches?: number | undefined;
            default?: string | undefined;
        } | undefined;
    }>;
    /** Create a new deal pipeline */
    create(params: RequestBody<"dealPipelines.create">): Promise<{
        data?: {
            id?: string | undefined;
            type?: string | undefined;
        } | undefined;
    }>;
    /** Update an existing deal pipeline */
    update(params: RequestBody<"dealPipelines.update">): Promise<void>;
    /** Mark a deal pipeline as default */
    markAsDefault(params: RequestBody<"dealPipelines.markAsDefault">): Promise<void>;
    /** Duplicate a deal pipeline */
    duplicate(params: RequestBody<"dealPipelines.duplicate">): Promise<{
        data?: {
            type?: string | undefined;
            id: string;
        } | undefined;
    }>;
    /** Delete a deal pipeline */
    delete(params: RequestBody<"dealPipelines.delete">): Promise<void>;
}
//# sourceMappingURL=deal-pipelines.d.ts.map