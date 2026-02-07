import { BaseResource } from "./base.js";
export class ExpensesResource extends BaseResource {
    list(params) {
        return this.client.request("/expenses.list", params);
    }
}
//# sourceMappingURL=expenses.js.map