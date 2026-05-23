import { getUserController, updateUserController } from "@/controllers/user-controller";
import { requireAuth } from "@/middlewares/auth";
import { validate } from "@/middlewares/validation";
import { updateUserValidation } from "@/validations/user-validation";
import { Router } from "express";

const router = Router();

router.use(requireAuth);

router.get("/me", getUserController);
router.patch("/", validate({ schema: updateUserValidation, type: "body" }), updateUserController);

export default router;
