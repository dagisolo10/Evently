import { hasApiError } from "../api-errors";

import api from "@/lib/axios";
import type { ApiResult } from "@/lib/api/api-responses";
import type { PopulatedTask, Task } from "@/types/models/task";
import type { CompleteTaskPayload, CreateTaskPayload, DeleteTaskQuery, UpdateTaskPayload } from "@/types/payloads/task";

export const taskApi = {
    getByEvent: async (eventId: string): Promise<{ tasks: PopulatedTask[] }> => {
        const { data } = await api.get<ApiResult<{ tasks: PopulatedTask[] }>>(`/api/tasks/event/${eventId}`);

        if (hasApiError(data)) throw data.error;

        return data;
    },

    getActiveByEvent: async (eventId: string): Promise<{ tasks: Task[] }> => {
        const { data } = await api.get<ApiResult<{ tasks: Task[] }>>(`/api/tasks/event/${eventId}/active`);

        if (hasApiError(data)) throw data.error;

        return data;
    },

    create: async (body: CreateTaskPayload): Promise<{ task: Task }> => {
        const { data } = await api.post<ApiResult<{ task: Task }>>(`/api/tasks`, body);

        if (hasApiError(data)) throw data.error;

        return data;
    },

    update: async (id: string, body: UpdateTaskPayload): Promise<{ task: Task }> => {
        const { data } = await api.put<ApiResult<{ task: Task }>>(`/api/tasks/${id}`, body);

        if (hasApiError(data)) throw data.error;

        return data;
    },

    remove: async (id: string, params: DeleteTaskQuery): Promise<{ message: string }> => {
        const { data } = await api.delete<ApiResult<{ message: string }>>(`/api/tasks/${id}`, { params });

        if (hasApiError(data)) throw data.error;

        return data;
    },

    complete: async (id: string, body: CompleteTaskPayload): Promise<{ task: Task }> => {
        const { data } = await api.patch<ApiResult<{ task: Task }>>(`/api/tasks/${id}/complete`, body);

        if (hasApiError(data)) throw data.error;

        return data;
    },
};
