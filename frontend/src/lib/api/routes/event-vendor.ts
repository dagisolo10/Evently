import { hasApiError } from "../api-errors";

import api from "@/lib/axios";
import type { ApiResult } from "@/lib/api/api-responses";
import type { PopulatedEventVendor } from "@/types/models/event-vendor";
import type {
    BulkUnlinkVendorsPayload,
    LinkVendorToEventPayload,
    UnlinkVendorPayload,
    UpdateEventVendorPayload,
} from "@/types/payloads/event-vendor";

export const eventVendorApi = {
    list: async (): Promise<{ eventVendors: PopulatedEventVendor[] }> => {
        const { data } = await api.get<ApiResult<{ eventVendors: PopulatedEventVendor[] }>>("/api/event-vendors");

        if (hasApiError(data)) throw data.error;

        return data;
    },

    getByEvent: async (eventId: string): Promise<{ eventVendors: PopulatedEventVendor[] }> => {
        const { data } = await api.get<ApiResult<{ eventVendors: PopulatedEventVendor[] }>>(`/api/event-vendors/${eventId}`);

        if (hasApiError(data)) throw data.error;

        return data;
    },

    link: async (body: LinkVendorToEventPayload): Promise<{ eventVendor: PopulatedEventVendor }> => {
        const { data } = await api.post<ApiResult<{ eventVendor: PopulatedEventVendor }>>("/api/event-vendors/link", body);

        if (hasApiError(data)) throw data.error;

        return data;
    },

    update: async (id: string, body: UpdateEventVendorPayload): Promise<{ eventVendor: PopulatedEventVendor }> => {
        const { data } = await api.put<ApiResult<{ eventVendor: PopulatedEventVendor }>>(`/api/event-vendors/${id}`, body);

        if (hasApiError(data)) throw data.error;

        return data;
    },

    unlink: async (id: string, body: UnlinkVendorPayload): Promise<{ message: string }> => {
        const { data } = await api.delete<ApiResult<{ message: string }>>(`/api/event-vendors/${id}`, { data: body });

        if (hasApiError(data)) throw data.error;

        return data;
    },

    bulkUnlink: async (body: BulkUnlinkVendorsPayload): Promise<{ message: string }> => {
        const { data } = await api.post<ApiResult<{ message: string }>>("/api/event-vendors/bulk-unlink", body);

        if (hasApiError(data)) throw data.error;

        return data;
    },
};
