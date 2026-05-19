// Synthetic resource for audit-consistency tests.
// Follows the canonical SDK pattern: list/info/add/update/delete with
// uniform parameter shapes and standard return envelopes.

import type { RequestBody, ResponseBody } from "../../../../src/types/common.js";
import { BaseResource } from "../../../../src/resources/base.js";

export class GoodResource extends BaseResource {
  list(params?: RequestBody<"good.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<unknown>("/good.list", params, options);
  }

  info(params: RequestBody<"good.info">) {
    return this.client.request<ResponseBody<"good.info">>("/good.info", params);
  }

  add(params: RequestBody<"good.add">) {
    return this.client.request<ResponseBody<"good.add">>("/good.add", params);
  }

  update(params: RequestBody<"good.update">) {
    return this.client.request<void>("/good.update", params);
  }

  delete(params: RequestBody<"good.delete">) {
    return this.client.request<void>("/good.delete", params);
  }
}
