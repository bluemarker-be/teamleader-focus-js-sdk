import { BaseResource } from "./base.js";
export class DealsResource extends BaseResource {
    /** Get a list of deals */
    list(params) {
        return this.client.request("/deals.list", params);
    }
    /** Get details for a single deal */
    info(params) {
        return this.client.request("/deals.info", params);
    }
    /** Create a new deal */
    create(params) {
        return this.client.request("/deals.create", params);
    }
    /** Update an existing deal */
    update(params) {
        return this.client.request("/deals.update", params);
    }
    /** Move a deal to a different phase */
    move(params) {
        return this.client.request("/deals.move", params);
    }
    /** Mark a deal as won */
    win(params) {
        return this.client.request("/deals.win", params);
    }
    /** Mark a deal as lost */
    lose(params) {
        return this.client.request("/deals.lose", params);
    }
    /** Delete a deal */
    delete(params) {
        return this.client.request("/deals.delete", params);
    }
}
//# sourceMappingURL=deals.js.map