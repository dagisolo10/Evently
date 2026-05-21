import { hasApiError } from "../api-errors";

import api from "@/lib/axios";
import type { ApiResult } from "@/lib/api/api-responses";
import type { Activity } from "@/types/models/activity";
import type { Event, PopulatedEvent } from "@/types/models/event";
import type { EventFinanceStats, EventStats } from "@/types/models/stats";
import type { CreateEventPayload, UpdateEventPayload } from "@/types/payloads/event";

export const eventApi = {
    list: async (): Promise<Event[]> => {
        const { data } = await api.get<ApiResult<Event[]>>("/api/events");

        if (hasApiError(data)) throw data.error;

        return data;
    },

    get: async (id: string): Promise<Event> => {
        const { data } = await api.get<ApiResult<{ event: Event }>>(`/api/events/${id}`);

        if (hasApiError(data)) throw data.error;

        return data.event;
    },

    create: async (body: CreateEventPayload): Promise<{ event: Event }> => {
        const { data } = await api.post<ApiResult<{ event: Event }>>("/api/events", body);

        if (hasApiError(data)) throw data.error;

        return data;
    },

    update: async (id: string, body: UpdateEventPayload): Promise<{ event: Event }> => {
        const { data } = await api.put<ApiResult<{ event: Event }>>(`/api/events/${id}`, body);

        if (hasApiError(data)) throw data.error;

        return data;
    },

    remove: async (id: string): Promise<{ message: string }> => {
        const { data } = await api.delete<ApiResult<{ message: string }>>(`/api/events/${id}`);

        if (hasApiError(data)) throw data.error;

        return data;
    },

    getActivities: async (id: string): Promise<{ activity: Activity[] }> => {
        const { data } = await api.get<ApiResult<{ activity: Activity[] }>>(`/api/events/${id}/activities`);

        if (hasApiError(data)) throw data.error;

        return data;
    },

    getPopulated: async (id: string): Promise<{ event: PopulatedEvent | null }> => {
        const { data } = await api.get<ApiResult<{ event: PopulatedEvent | null }>>(`/api/events/${id}/populated`);

        if (hasApiError(data)) throw data.error;

        return data;
    },

    getStats: async (id: string): Promise<EventStats> => {
        const { data } = await api.get<ApiResult<EventStats>>(`/api/events/${id}/stats`);

        if (hasApiError(data)) throw data.error;

        return data;
    },

    getFinanceStats: async (id: string): Promise<EventFinanceStats> => {
        const { data } = await api.get<ApiResult<EventFinanceStats>>(`/api/events/${id}/finance-stats`);

        if (hasApiError(data)) throw data.error;

        return data;
    },
};
