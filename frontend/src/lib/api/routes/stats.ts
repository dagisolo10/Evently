import { hasApiError } from "../api-errors";

import api from "@/lib/axios";
import type { ApiResult } from "@/lib/api/api-responses";
import type { DashboardStats, FinanceStats } from "@/types/models/stats";

export const statsApi = {
    getDashboard: async (): Promise<DashboardStats> => {
        const { data } = await api.get<ApiResult<DashboardStats>>("/api/stats/dashboard");

        if (hasApiError(data)) throw data.error;

        return data;
    },

    getFinance: async (): Promise<FinanceStats> => {
        const { data } = await api.get<ApiResult<FinanceStats>>("/api/stats/finance");

        if (hasApiError(data)) throw data.error;

        return data;
    },
};
