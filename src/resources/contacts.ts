import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class ContactsResource extends BaseResource {
  /** Get a list of contacts */
  list(params?: RequestBody<"contacts.list">) {
    return this.client.request<ResponseBody<"contacts.list">>("/contacts.list", params);
  }

  /** Get details for a single contact */
  info(params: RequestBody<"contacts.info">) {
    return this.client.request<ResponseBody<"contacts.info">>("/contacts.info", params);
  }

  /** Create a new contact */
  add(params: RequestBody<"contacts.add">) {
    return this.client.request<ResponseBody<"contacts.add">>("/contacts.add", params);
  }

  /** Update an existing contact */
  update(params: RequestBody<"contacts.update">) {
    return this.client.request<void>("/contacts.update", params);
  }

  /** Delete a contact */
  delete(params: RequestBody<"contacts.delete">) {
    return this.client.request<void>("/contacts.delete", params);
  }

  /** Add tags to a contact */
  tag(params: RequestBody<"contacts.tag">) {
    return this.client.request<void>("/contacts.tag", params);
  }

  /** Remove tags from a contact */
  untag(params: RequestBody<"contacts.untag">) {
    return this.client.request<void>("/contacts.untag", params);
  }

  /** Link a contact to a company */
  linkToCompany(params: RequestBody<"contacts.linkToCompany">) {
    return this.client.request<void>("/contacts.linkToCompany", params);
  }

  /** Unlink a contact from a company */
  unlinkFromCompany(params: RequestBody<"contacts.unlinkFromCompany">) {
    return this.client.request<void>("/contacts.unlinkFromCompany", params);
  }

  /** Update the link between a contact and a company */
  updateCompanyLink(params: RequestBody<"contacts.updateCompanyLink">) {
    return this.client.request<void>("/contacts.updateCompanyLink", params);
  }
}
