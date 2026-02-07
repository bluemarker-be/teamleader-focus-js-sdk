import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class ExternalPartiesResource extends BaseResource {
    addToProject(params: RequestBody<"NextgenProjectsExternalParties.addToProject">): Promise<void>;
    update(params: RequestBody<"NextgenProjectsExternalParties.update">): Promise<void>;
    delete(params: RequestBody<"NextgenProjectsExternalParties.delete">): Promise<void>;
}
//# sourceMappingURL=external-parties.d.ts.map