import type { TeamleaderClient } from "../client.js";
/**
 * Base class for all resource modules.
 * Provides the authenticated client reference for making API requests.
 */
export declare abstract class BaseResource {
    protected readonly client: TeamleaderClient;
    constructor(client: TeamleaderClient);
}
//# sourceMappingURL=base.d.ts.map