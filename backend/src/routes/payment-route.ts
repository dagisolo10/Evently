import { addPaymentController, deletePaymentController, getEventPaymentsController, getPaymentsController, updatePaymentController } from "@/controllers/payment-controller";
import { requireAuth } from "@/middlewares/auth";
import { validate } from "@/middlewares/validation";
import { Router } from "express";
import { createPaymentSchema, eventIdParamsSchema, paymentIdParamsSchema, updatePaymentSchema } from "@/validations/payment-validation";

const router = Router();

router.use(requireAuth);

router.get("/", getPaymentsController);
router.get("/event/:eventId", validate({ schema: eventIdParamsSchema, type: "params" }), getEventPaymentsController);
router.post("/", validate({ schema: createPaymentSchema, type: "body" }), addPaymentController);
router.put("/:id", validate({ schema: paymentIdParamsSchema, type: "params" }), validate({ schema: updatePaymentSchema, type: "body" }), updatePaymentController);
router.delete("/:id", validate({ schema: paymentIdParamsSchema, type: "params" }), deletePaymentController);

export default router;
