import { hasApiError } from "../api-errors";

import api from "@/lib/axios";
import type { ApiResult } from "@/lib/api/api-responses";
import type { Payment } from "@/types/models/payment";
import type { AddPaymentPayload, UpdatePaymentPayload } from "@/types/payloads/payment";

export const paymentApi = {
    list: async (): Promise<{ payments: Payment[] }> => {
        const { data } = await api.get<ApiResult<{ payments: Payment[] }>>("/api/payments");

        if (hasApiError(data)) throw data.error;

        return data;
    },

    getByEvent: async (eventId: string): Promise<{ payments: Payment[] }> => {
        const { data } = await api.get<ApiResult<{ payments: Payment[] }>>(`/api/payments/event/${eventId}`);

        if (hasApiError(data)) throw data.error;

        return data;
    },

    add: async (body: AddPaymentPayload): Promise<{ payment: Payment }> => {
        const { data } = await api.post<ApiResult<{ payment: Payment }>>("/api/payments", body);

        if (hasApiError(data)) throw data.error;

        return data;
    },

    update: async (id: string, body: UpdatePaymentPayload): Promise<{ payment: Payment }> => {
        const { data } = await api.put<ApiResult<{ payment: Payment }>>(`/api/payments/${id}`, body);

        if (hasApiError(data)) throw data.error;

        return data;
    },

    remove: async (id: string): Promise<{ payment: Payment }> => {
        const { data } = await api.delete<ApiResult<{ payment: Payment }>>(`/api/payments/${id}`);

        if (hasApiError(data)) throw data.error;

        return data;
    },
};
