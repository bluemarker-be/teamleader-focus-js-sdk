import type { ListItem, RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class FilesResource extends BaseResource {
  /** Iterate all files — auto-paginates across every page. */
  list(params: RequestBody<"files.list">, options?: { maxPages?: number }) {
    return this.client.paginateItems<ListItem<"files.list">>("/files.list", params, options);
  }

  /** Get details for a single file */
  info(params: RequestBody<"files.info">) {
    return this.client.request<ResponseBody<"files.info">>("/files.info", params);
  }

  /** Upload a file */
  upload(params: RequestBody<"files.upload">) {
    return this.client.request<ResponseBody<"files.upload">>("/files.upload", params);
  }

  /** Download a file */
  download(params: RequestBody<"files.download">) {
    return this.client.request<ResponseBody<"files.download">>("/files.download", params);
  }

  /** Delete a file */
  delete(params: RequestBody<"files.delete">) {
    return this.client.request<void>("/files.delete", params);
  }
}
