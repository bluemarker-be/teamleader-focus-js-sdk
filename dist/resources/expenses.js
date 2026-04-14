import { BaseResource } from "./base.js";
export class ExpensesResource extends BaseResource {
    /** Get a list of expenses */
    list(params) {
        return this.client.request("/expenses.list", params);
    }
}
//# sourceMappingURL=expenses.js.map