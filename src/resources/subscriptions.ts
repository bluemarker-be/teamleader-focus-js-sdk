import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class SubscriptionsResource extends BaseResource {
  list(params?: RequestBody<"subscriptions.list">) {
    return this.client.request<ResponseBody<"subscriptions.list">>("/subscriptions.list", params);
  }

  info(params: RequestBody<"subscriptions.info">) {
    return this.client.request<ResponseBody<"subscriptions.info">>("/subscriptions.info", params);
  }

  create(params: RequestBody<"subscriptions.create">) {
    return this.client.request<ResponseBody<"subscriptions.create">>("/subscriptions.create", params);
  }

  update(params: RequestBody<"subscriptions.update">) {
    return this.client.request<void>("/subscriptions.update", params);
  }

  deactivate(params: RequestBody<"subscriptions.deactivate">) {
    return this.client.request<void>("/subscriptions.deactivate", params);
  }
}
