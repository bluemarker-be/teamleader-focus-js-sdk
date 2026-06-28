import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class CloudPlatformsResource extends BaseResource {
    /** Get the cloud platform URL */
    url(params: RequestBody<"cloudPlatforms.url">): Promise<{
        data?: {
            public?: string | undefined;
            preview?: string | undefined;
        } | {
            url?: string | undefined;
        } | undefined;
    }>;
}
//# sourceMappingURL=cloud-platforms.d.ts.map