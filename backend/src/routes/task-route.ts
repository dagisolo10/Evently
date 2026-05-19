import { Router } from "express";
import { requireAuth } from "@/middlewares/auth";
import { validate } from "@/middlewares/validation";
import { completeTaskSchema, eventIdParamsSchema, deleteTaskQuerySchema, taskIdParamsSchema, updateTaskSchema, createTaskSchema } from "@/validations/task-validation";
import { completeTaskController, createTaskController, deleteTaskController, getActiveTasksController, getTasksController, updateTaskController } from "@/controllers/task-controller";

const router = Router();

router.use(requireAuth);

router.get("/event/:eventId", validate({ schema: eventIdParamsSchema, type: "params" }), getTasksController);
router.get("/event/:eventId/active", validate({ schema: eventIdParamsSchema, type: "params" }), getActiveTasksController);
router.put("/:id", validate({ schema: taskIdParamsSchema, type: "params" }), validate({ schema: updateTaskSchema, type: "body" }), updateTaskController);
router.delete("/:id", validate({ schema: taskIdParamsSchema, type: "params" }), validate({ schema: deleteTaskQuerySchema, type: "query" }), deleteTaskController);
router.patch("/:id/complete", validate({ schema: taskIdParamsSchema, type: "params" }), validate({ schema: completeTaskSchema, type: "body" }), completeTaskController);
router.post("/", validate({ schema: createTaskSchema, type: "body" }), createTaskController);

export default router;
