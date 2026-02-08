import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class CloudPlatformsResource extends BaseResource {
  /** Get the cloud platform URL */
  url(params: RequestBody<"cloudPlatforms.url">) {
    return this.client.request<ResponseBody<"cloudPlatforms.url">>("/cloudPlatforms.url", params);
  }
}
