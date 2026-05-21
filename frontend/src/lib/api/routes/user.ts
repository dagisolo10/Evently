import { hasApiError } from "../api-errors";

import type { ApiResult } from "@/lib/api/api-responses";
import api from "@/lib/axios";
import type { PopulatedUser } from "@/types/models/user";
import type { CreateUserPayload, UpdateUserPayload } from "@/types/payloads/user";

export const userApi = {
    me: async (): Promise<PopulatedUser> => {
        const { data } = await api.get<ApiResult<PopulatedUser>>("/api/users/me");

        if (hasApiError(data)) throw data.error;

        return data;
    },

    createUser: async (body: CreateUserPayload): Promise<PopulatedUser> => {
        const { data } = await api.post<ApiResult<PopulatedUser>>("/api/users", body);

        if (hasApiError(data)) throw data.error;

        return data;
    },

    updateUser: async (body: UpdateUserPayload): Promise<PopulatedUser> => {
        const { data } = await api.patch<ApiResult<PopulatedUser>>("/api/users", body);

        if (hasApiError(data)) throw data.error;

        return data;
    },
};
