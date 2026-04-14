import { BaseResource } from "./base.js";
export class ExpensesResource extends BaseResource {
    /** Iterate all expenses — auto-paginates across every page. */
    list(params, options) {
        return this.client.paginateItems("/expenses.list", params, options);
    }
}
//# sourceMappingURL=expenses.js.map