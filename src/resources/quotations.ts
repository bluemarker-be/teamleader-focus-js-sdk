import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class QuotationsResource extends BaseResource {
  /** Get a list of quotations */
  list(params?: RequestBody<"quotations.list">) {
    return this.client.request<ResponseBody<"quotations.list">>("/quotations.list", params);
  }

  /** Get details for a single quotation */
  info(params: RequestBody<"quotations.info">) {
    return this.client.request<ResponseBody<"quotations.info">>("/quotations.info", params);
  }

  /** Download a quotation PDF */
  download(params: RequestBody<"quotations.download">) {
    return this.client.request<ResponseBody<"quotations.download">>("/quotations.download", params);
  }

  /** Create a new quotation */
  create(params: RequestBody<"quotations.create">) {
    return this.client.request<ResponseBody<"quotations.create">>("/quotations.create", params);
  }

  /** Send a quotation via email */
  send(params: RequestBody<"quotations.send">) {
    return this.client.request<void>("/quotations.send", params);
  }

  /** Update an existing quotation */
  update(params: RequestBody<"quotations.update">) {
    return this.client.request<void>("/quotations.update", params);
  }

  /** Accept a quotation */
  accept(params: RequestBody<"quotations.accept">) {
    return this.client.request<void>("/quotations.accept", params);
  }

  /** Delete a quotation */
  delete(params: RequestBody<"quotations.delete">) {
    return this.client.request<void>("/quotations.delete", params);
  }
}
