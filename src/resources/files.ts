import type { RequestBody, ResponseBody } from "../types/common.js";
import { BaseResource } from "./base.js";

export class FilesResource extends BaseResource {
  list(params: RequestBody<"files.list">) {
    return this.client.request<ResponseBody<"files.list">>("/files.list", params);
  }

  info(params: RequestBody<"files.info">) {
    return this.client.request<ResponseBody<"files.info">>("/files.info", params);
  }

  upload(params: RequestBody<"files.upload">) {
    return this.client.request<ResponseBody<"files.upload">>("/files.upload", params);
  }

  download(params: RequestBody<"files.download">) {
    return this.client.request<ResponseBody<"files.download">>("/files.download", params);
  }

  delete(params: RequestBody<"files.delete">) {
    return this.client.request<void>("/files.delete", params);
  }
}
