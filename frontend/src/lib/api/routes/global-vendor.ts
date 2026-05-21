import { hasApiError } from "../api-errors";

import api from "@/lib/axios";
import type { ApiResult } from "@/lib/api/api-responses";
import type { GlobalVendor } from "@/types/models/global-vendor";
import type { BulkArchiveGlobalVendorsPayload, CreateGlobalVendorPayload, UpdateGlobalVendorPayload } from "@/types/payloads/global-vendor";

export const globalVendorApi = {
    list: async (): Promise<{ globalVendors: GlobalVendor[] }> => {
        const { data } = await api.get<ApiResult<{ globalVendors: GlobalVendor[] }>>("/api/global-vendors");

        if (hasApiError(data)) throw data.error;

        return data;
    },

    create: async (body: CreateGlobalVendorPayload): Promise<{ globalVendor: GlobalVendor }> => {
        const { data } = await api.post<ApiResult<{ globalVendor: GlobalVendor }>>("/api/global-vendors", body);

        if (hasApiError(data)) throw data.error;

        return data;
    },

    update: async (id: string, body: UpdateGlobalVendorPayload): Promise<{ globalVendor: GlobalVendor }> => {
        const { data } = await api.put<ApiResult<{ globalVendor: GlobalVendor }>>(`/api/global-vendors/${id}`, body);

        if (hasApiError(data)) throw data.error;

        return data;
    },

    archive: async (id: string): Promise<{ globalVendor: GlobalVendor }> => {
        const { data } = await api.delete<ApiResult<{ globalVendor: GlobalVendor }>>(`/api/global-vendors/${id}`);

        if (hasApiError(data)) throw data.error;

        return data;
    },

    bulkArchive: async (body: BulkArchiveGlobalVendorsPayload): Promise<{ count: number }> => {
        const { data } = await api.post<ApiResult<{ count: number }>>("/api/global-vendors/bulk-archive", body);

        if (hasApiError(data)) throw data.error;

        return data;
    },
};
