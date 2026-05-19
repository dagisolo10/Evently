import { archiveGlobalVendorController, bulkArchiveGlobalVendorsController, createGlobalVendorController, getGlobalVendorsController, updateGlobalVendorController } from "@/controllers/global-vendor-controller";
import { requireAuth } from "@/middlewares/auth";
import { validate } from "@/middlewares/validation";
import { Router } from "express";
import { bulkArchiveVendorsSchema, createGlobalVendorSchema, globalVendorIdParamsSchema, updateGlobalVendorSchema } from "@/validations/global-vendor-validation";

const router = Router();

router.use(requireAuth);

router.get("/", getGlobalVendorsController);
router.post("/", validate({ schema: createGlobalVendorSchema, type: "body" }), createGlobalVendorController);
router.post("/bulk-archive", validate({ schema: bulkArchiveVendorsSchema, type: "body" }), bulkArchiveGlobalVendorsController);
router.put("/:id", validate({ schema: globalVendorIdParamsSchema, type: "params" }), validate({ schema: updateGlobalVendorSchema, type: "body" }), updateGlobalVendorController);
router.delete("/:id", validate({ schema: globalVendorIdParamsSchema, type: "params" }), archiveGlobalVendorController);

export default router;
