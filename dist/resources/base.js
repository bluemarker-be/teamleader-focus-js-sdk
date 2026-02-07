/**
 * Base class for all resource modules.
 * Provides the authenticated client reference for making API requests.
 */
export class BaseResource {
    client;
    constructor(client) {
        this.client = client;
    }
}
//# sourceMappingURL=base.js.map