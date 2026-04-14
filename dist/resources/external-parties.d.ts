import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
/** External parties within Projects v2 */
export declare class ExternalPartiesResource extends BaseResource {
    /** Add an external party to a project */
    addToProject(params: RequestBody<"NextgenProjectsExternalParties.addToProject">): Promise<void>;
    /** Update an external party */
    update(params: RequestBody<"NextgenProjectsExternalParties.update">): Promise<void>;
    /** Delete an external party */
    delete(params: RequestBody<"NextgenProjectsExternalParties.delete">): Promise<void>;
}
//# sourceMappingURL=external-parties.d.ts.map