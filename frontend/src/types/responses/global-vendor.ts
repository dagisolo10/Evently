import type { ApiResult } from "@/lib/api/api-responses";
import type { GlobalVendor } from "@/types/models/global-vendor";

export type GetGlobalVendorsResponse = ApiResult<{ globalVendors: GlobalVendor[] }>;
export type CreateGlobalVendorResponse = ApiResult<{ globalVendor: GlobalVendor }>;
export type UpdateGlobalVendorResponse = ApiResult<{ globalVendor: GlobalVendor }>;
export type ArchiveGlobalVendorResponse = ApiResult<{ globalVendor: GlobalVendor }>;
export type BulkArchiveGlobalVendorsResponse = ApiResult<{ count: number }>;

