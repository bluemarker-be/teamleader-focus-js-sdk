import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class FilesResource extends BaseResource {
    list(params: RequestBody<"files.list">): Promise<{
        data?: {
            id?: string | undefined;
            subject?: {
                id?: string | undefined;
                type?: "company" | "contact" | "invoice" | "ticket" | "creditNote" | "deal" | "nextgenProject" | undefined;
            } | null | undefined;
            name?: string | undefined;
            mime_type?: "application/msword" | "application/octet-stream" | "application/pdf" | "application/vnd.ms-excel" | "application/vnd.ms-powerpoint" | "application/vnd.openxmlformats-officedocument.presentationml.presentation" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | "application/vnd.openxmlformats-officedocument.wordprocessingml.document" | "application/xml" | "application/zip" | "audio/mpeg" | "audio/wav" | "image/gif" | "image/jpeg" | "image/png" | "text/css" | "text/csv" | "text/html" | "text/javascript" | "text/plain" | "video/3gpp" | "video/mpeg" | "video/quicktime" | "video/x-msvideo" | undefined;
            size?: number | undefined;
            updated_at?: string | undefined;
            uploaded_by?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            folder?: string | undefined;
        }[] | undefined;
    }>;
    info(params: RequestBody<"files.info">): Promise<{
        data?: {
            id?: string | undefined;
            subject?: {
                id?: string | undefined;
                type?: "company" | "contact" | "product" | "project" | "invoice" | "ticket" | "meeting" | "order" | "creditNote" | "deal" | "nextgenProject" | "workOrder" | undefined;
            } | null | undefined;
            name?: string | undefined;
            mime_type?: "application/msword" | "application/octet-stream" | "application/pdf" | "application/vnd.ms-excel" | "application/vnd.ms-powerpoint" | "application/vnd.openxmlformats-officedocument.presentationml.presentation" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | "application/vnd.openxmlformats-officedocument.wordprocessingml.document" | "application/xml" | "application/zip" | "audio/mpeg" | "audio/wav" | "image/gif" | "image/jpeg" | "image/png" | "text/css" | "text/csv" | "text/html" | "text/javascript" | "text/plain" | "video/3gpp" | "video/mpeg" | "video/quicktime" | "video/x-msvideo" | undefined;
            size?: number | undefined;
            updated_at?: string | undefined;
            uploaded_by?: {
                id?: string | undefined;
                type?: string | undefined;
            } | null | undefined;
            folder?: string | undefined;
        } | undefined;
    }>;
    upload(params: RequestBody<"files.upload">): Promise<{
        data?: {
            location?: string | undefined;
            expires_at?: string | undefined;
        } | undefined;
    }>;
    download(params: RequestBody<"files.download">): Promise<{
        data?: {
            location?: string | undefined;
            expires_at?: string | undefined;
        } | undefined;
    }>;
    delete(params: RequestBody<"files.delete">): Promise<void>;
}
//# sourceMappingURL=files.d.ts.map