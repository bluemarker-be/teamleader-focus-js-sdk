import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class SubscriptionsResource extends BaseResource {
  /** Iterate all subscriptions — auto-paginates across every page. */
  list(params?: RequestBody<"subscriptions.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"subscriptions.list">>("/subscriptions.list", params, options);
  }

  /** Get details for a single subscription */
  info(params: RequestBody<"subscriptions.info">) {
    return this.client.request<ResponseBody<"subscriptions.info">>("/subscriptions.info", params);
  }

  /** Create a new subscription */
  create(params: RequestBody<"subscriptions.create">) {
    return this.client.request<ResponseBody<"subscriptions.create">>("/subscriptions.create", params);
  }

  /** Update an existing subscription */
  update(params: RequestBody<"subscriptions.update">) {
    return this.client.request<void>("/subscriptions.update", params);
  }

  /** Deactivate a subscription */
  deactivate(params: RequestBody<"subscriptions.deactivate">) {
    return this.client.request<void>("/subscriptions.deactivate", params);
  }
}
