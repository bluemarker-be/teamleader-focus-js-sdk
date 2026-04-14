import type { TeamleaderFocusClient } from "../client.js";
/**
 * Base class for all resource modules.
 * Provides the authenticated client reference for making API requests.
 */
export declare abstract class BaseResource {
    protected readonly client: TeamleaderFocusClient;
    constructor(client: TeamleaderFocusClient);
}
//# sourceMappingURL=base.d.ts.map