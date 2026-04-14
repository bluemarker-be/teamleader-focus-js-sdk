import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class WebhooksResource extends BaseResource {
  /** Register a new webhook */
  register(params: RequestBody<"webhooks.register">) {
    return this.client.request<void>("/webhooks.register", params);
  }

  /** Iterate all webhooks — auto-paginates across every page. */
  list(params?: RequestBody<"webhooks.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"webhooks.list">>("/webhooks.list", params, options);
  }

  /** Unregister a webhook */
  unregister(params: RequestBody<"webhooks.unregister">) {
    return this.client.request<void>("/webhooks.unregister", params);
  }
}
