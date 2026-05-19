import { Router } from "express";
import { requireAuth } from "@/middlewares/auth";
import { validate } from "@/middlewares/validation";
import { createUserValidation } from "@/validations/user-validation";
import { createUserController, getUserController } from "@/controllers/user-controller";

const router = Router();

router.use(requireAuth);

router.get("/me", getUserController);
router.post("/", validate({ schema: createUserValidation, type: "body" }), createUserController);

export default router;
