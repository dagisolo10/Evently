import dashboardStats from "@/services/stats/get-dashboard-stats";
import getEventFinanceStats from "@/services/stats/get-event-finance-stats";
import { getEventStats } from "@/services/stats/get-event-stats";
import getFinanceStats from "@/services/stats/get-finance-stats";
import type { Request, Response } from "express";
import { isServiceError } from "@/types/response";

export async function getDashboardStatsController(_req: Request, res: Response) {
    try {
        const result = await dashboardStats();

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function getEventFinanceStatsController(req: Request, res: Response) {
    try {
        const { id } = req.params as { id: string };
        const result = await getEventFinanceStats(id);

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function getEventStatsController(req: Request, res: Response) {
    try {
        const { id } = req.params as { id: string };
        const result = await getEventStats(id);

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function getFinanceStatsController(_req: Request, res: Response) {
    try {
        const result = await getFinanceStats();

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
