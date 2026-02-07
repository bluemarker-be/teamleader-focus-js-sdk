import { BaseResource } from "./base.js";
export class ClosingDaysResource extends BaseResource {
    list(params) {
        return this.client.request("/closingDays.list", params);
    }
    add(params) {
        return this.client.request("/closingDays.add", params);
    }
    delete(params) {
        return this.client.request("/closingDays.delete", params);
    }
}
//# sourceMappingURL=closing-days.js.map