import { createEventController, deleteEventController, getEventActivitiesController, getEventController, getEventsController, getPopulatedEventController, updateEventController } from "@/controllers/event-controller";
import { getEventFinanceStatsController, getEventStatsController } from "@/controllers/stats-controller";
import { requireAuth } from "@/middlewares/auth";
import { validate } from "@/middlewares/validation";
import { createEventSchema, eventIdParamsSchema, updateEventSchema } from "@/validations/event-validation";
import { Router } from "express";

const router = Router();

router.use(requireAuth);

router.get("/", getEventsController);
router.get("/:id", validate({ schema: eventIdParamsSchema, type: "params" }), getEventController);
router.get("/:id/activities", validate({ schema: eventIdParamsSchema, type: "params" }), getEventActivitiesController);
router.get("/:id/populated", validate({ schema: eventIdParamsSchema, type: "params" }), getPopulatedEventController);
router.get("/:id/stats", validate({ schema: eventIdParamsSchema, type: "params" }), getEventStatsController);
router.get("/:id/finance-stats", validate({ schema: eventIdParamsSchema, type: "params" }), getEventFinanceStatsController);
router.post("/", validate({ schema: createEventSchema, type: "body" }), createEventController);
router.put("/:id", validate({ schema: eventIdParamsSchema, type: "params" }), validate({ schema: updateEventSchema, type: "body" }), updateEventController);
router.delete("/:id", validate({ schema: eventIdParamsSchema, type: "params" }), deleteEventController);

export default router;
