import { BaseResource } from "./base.js";
export class ReservationsResource extends BaseResource {
    /** Iterate all reservations — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/reservations.list", params, options);
    }
    create(params) {
        return this.client.request("/reservations.create", params);
    }
    update(params) {
        return this.client.request("/reservations.update", params);
    }
    delete(params) {
        return this.client.request("/reservations.delete", params);
    }
}
//# sourceMappingURL=reservations.js.map