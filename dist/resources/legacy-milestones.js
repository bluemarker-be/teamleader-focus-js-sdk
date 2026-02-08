import { BaseResource } from "./base.js";
/** Legacy milestones (pre-v2). Only available for accounts not yet migrated to Projects v2. */
export class LegacyMilestonesResource extends BaseResource {
    /** Get a list of milestones */
    list(params) {
        return this.client.request("/milestones.list", params);
    }
    /** Get details for a single milestone */
    info(params) {
        return this.client.request("/milestones.info", params);
    }
    /** Create a new milestone */
    create(params) {
        return this.client.request("/milestones.create", params);
    }
    /** Update an existing milestone */
    update(params) {
        return this.client.request("/milestones.update", params);
    }
    /** Delete a milestone */
    delete(params) {
        return this.client.request("/milestones.delete", params);
    }
    /** Close a milestone */
    close(params) {
        return this.client.request("/milestones.close", params);
    }
    /** Open (reopen) a milestone */
    open(params) {
        return this.client.request("/milestones.open", params);
    }
}
//# sourceMappingURL=legacy-milestones.js.map