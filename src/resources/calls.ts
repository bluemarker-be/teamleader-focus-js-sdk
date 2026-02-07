import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class CallsResource extends BaseResource {
  list(params?: RequestBody<"calls.list">) {
    return this.client.request<ResponseBody<"calls.list">>("/calls.list", params);
  }

  info(params: RequestBody<"calls.info">) {
    return this.client.request<ResponseBody<"calls.info">>("/calls.info", params);
  }

  add(params: RequestBody<"calls.add">) {
    return this.client.request<ResponseBody<"calls.add">>("/calls.add", params);
  }

  update(params: RequestBody<"calls.update">) {
    return this.client.request<void>("/calls.update", params);
  }

  complete(params: RequestBody<"calls.complete">) {
    return this.client.request<void>("/calls.complete", params);
  }
}
