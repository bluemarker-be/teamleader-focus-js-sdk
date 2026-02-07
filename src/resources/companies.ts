import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class CompaniesResource extends BaseResource {
  /** Get a list of companies */
  list(params?: RequestBody<"companies.list">) {
    return this.client.request<ResponseBody<"companies.list">>("/companies.list", params);
  }

  /** Get details for a single company */
  info(params: RequestBody<"companies.info">) {
    return this.client.request<ResponseBody<"companies.info">>("/companies.info", params);
  }

  /** Create a new company */
  add(params: RequestBody<"companies.add">) {
    return this.client.request<ResponseBody<"companies.add">>("/companies.add", params);
  }

  /** Update an existing company */
  update(params: RequestBody<"companies.update">) {
    return this.client.request<void>("/companies.update", params);
  }

  /** Delete a company */
  delete(params: RequestBody<"companies.delete">) {
    return this.client.request<void>("/companies.delete", params);
  }

  /** Add tags to a company */
  tag(params: RequestBody<"companies.tag">) {
    return this.client.request<void>("/companies.tag", params);
  }

  /** Remove tags from a company */
  untag(params: RequestBody<"companies.untag">) {
    return this.client.request<void>("/companies.untag", params);
  }
}
