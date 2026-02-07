import { BaseResource } from "./base.js";
export class ReservationsResource extends BaseResource {
    list(params) {
        return this.client.request("/reservations.list", params);
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