import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class FilesResource extends BaseResource {
    list(params: RequestBody<"files.list">): Promise<{
        data?: {
            id?: string;
            subject?: ({
                id?: string;
                type?: string;
            } & {
                type?: "company" | "contact" | "deal" | "invoice" | "creditNote" | "nextgenProject" | "ticket";
            }) | null;
            name?: string;
            mime_type?: "application/msword" | "application/octet-stream" | "application/pdf" | "application/vnd.ms-excel" | "application/vnd.ms-powerpoint" | "application/vnd.openxmlformats-officedocument.presentationml.presentation" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | "application/vnd.openxmlformats-officedocument.wordprocessingml.document" | "application/xml" | "application/zip" | "audio/mpeg" | "audio/wav" | "image/gif" | "image/jpeg" | "image/png" | "text/css" | "text/csv" | "text/html" | "text/javascript" | "text/plain" | "video/3gpp" | "video/mpeg" | "video/quicktime" | "video/x-msvideo";
            size?: number;
            updated_at?: string;
            uploaded_by?: {
                id?: string;
                type?: string;
            } | null;
            folder?: string;
        }[];
    }>;
    info(params: RequestBody<"files.info">): Promise<{
        data?: {
            id?: string;
            subject?: ({
                id?: string;
                type?: string;
            } & {
                type?: "company" | "contact" | "deal" | "invoice" | "creditNote" | "meeting" | "order" | "product" | "project" | "nextgenProject" | "ticket" | "workOrder";
            }) | null;
            name?: string;
            mime_type?: "application/msword" | "application/octet-stream" | "application/pdf" | "application/vnd.ms-excel" | "application/vnd.ms-powerpoint" | "application/vnd.openxmlformats-officedocument.presentationml.presentation" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | "application/vnd.openxmlformats-officedocument.wordprocessingml.document" | "application/xml" | "application/zip" | "audio/mpeg" | "audio/wav" | "image/gif" | "image/jpeg" | "image/png" | "text/css" | "text/csv" | "text/html" | "text/javascript" | "text/plain" | "video/3gpp" | "video/mpeg" | "video/quicktime" | "video/x-msvideo";
            size?: number;
            updated_at?: string;
            uploaded_by?: {
                id?: string;
                type?: string;
            } | null;
            folder?: string;
        };
    }>;
    upload(params: RequestBody<"files.upload">): Promise<{
        data?: {
            location?: string;
            expires_at?: string;
        };
    }>;
    download(params: RequestBody<"files.download">): Promise<{
        data?: {
            location?: string;
            expires_at?: string;
        };
    }>;
    delete(params: RequestBody<"files.delete">): Promise<void>;
}
//# sourceMappingURL=files.d.ts.map