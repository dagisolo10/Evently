import type { ApiResult } from "@/lib/api/api-responses";
import type { DashboardStats, FinanceStats } from "@/types/models/stats";

export type GetDashboardStatsResponse = ApiResult<DashboardStats>;
export type GetFinanceStatsResponse = ApiResult<FinanceStats>;
