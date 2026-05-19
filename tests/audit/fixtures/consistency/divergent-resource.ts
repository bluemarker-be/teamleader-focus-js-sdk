// Synthetic resource for audit-consistency tests.
// Designed to trigger three flavours of divergence vs. GoodResource:
//   1. method_name:      uses `create` where GoodResource uses `add`
//   2. return_envelope:  `update` returns `single` instead of `void`
//   3. method_name:      uses `remove` where GoodResource uses `delete`
//                        (a second method_name divergence so the cluster
//                        renders multiple variants)
//
// `list` and `info` follow the canonical pattern so they DO match
// GoodResource on every attribute — used to confirm matching methods
// produce no divergence finding.

import type { RequestBody, ResponseBody } from "../../../../src/types/common.js";
import { BaseResource } from "../../../../src/resources/base.js";

export class DivergentResource extends BaseResource {
  list(params?: RequestBody<"divergent.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<unknown>("/divergent.list", params, options);
  }

  info(params: RequestBody<"divergent.info">) {
    return this.client.request<ResponseBody<"divergent.info">>("/divergent.info", params);
  }

  // Divergence #1: `create` (this resource) vs. `add` (GoodResource).
  create(params: RequestBody<"divergent.create">) {
    return this.client.request<ResponseBody<"divergent.create">>("/divergent.create", params);
  }

  // Divergence #2: `update` returns `single` instead of `void`.
  update(params: RequestBody<"divergent.update">) {
    return this.client.request<ResponseBody<"divergent.update">>("/divergent.update", params);
  }

  // Divergence #3: `remove` (this resource) vs. `delete` (GoodResource).
  remove(params: RequestBody<"divergent.remove">) {
    return this.client.request<void>("/divergent.remove", params);
  }
}
