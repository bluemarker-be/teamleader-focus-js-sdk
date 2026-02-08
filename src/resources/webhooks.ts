import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class WebhooksResource extends BaseResource {
  /** Register a new webhook */
  register(params: RequestBody<"webhooks.register">) {
    return this.client.request<void>("/webhooks.register", params);
  }

  /** Get a list of registered webhooks */
  list(params?: RequestBody<"webhooks.list">) {
    return this.client.request<ResponseBody<"webhooks.list">>("/webhooks.list", params);
  }

  /** Unregister a webhook */
  unregister(params: RequestBody<"webhooks.unregister">) {
    return this.client.request<void>("/webhooks.unregister", params);
  }
}
