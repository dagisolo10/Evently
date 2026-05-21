import type { ApiResult, ApiMessage } from "@/lib/api/api-responses";
import type { PopulatedEventVendor } from "@/types/models/event-vendor";

export type GetAllEventVendorsResponse = ApiResult<{ eventVendors: PopulatedEventVendor[] }>;
export type GetEventVendorsResponse = ApiResult<{ eventVendors: PopulatedEventVendor[] }>;
export type LinkVendorToEventResponse = ApiResult<{ eventVendor: PopulatedEventVendor }>;
export type UpdateEventVendorResponse = ApiResult<{ eventVendor: PopulatedEventVendor }>;
export type BulkUnlinkVendorsResponse = ApiResult<ApiMessage>;
export type UnlinkVendorResponse = ApiResult<ApiMessage>;

