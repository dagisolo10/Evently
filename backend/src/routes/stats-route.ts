import { getDashboardStatsController, getFinanceStatsController } from "@/controllers/stats-controller";
import { requireAuth } from "@/middlewares/auth";
import { Router } from "express";

const router = Router();

router.use(requireAuth);

router.get("/dashboard", getDashboardStatsController);
router.get("/finance", getFinanceStatsController);

export default router;
