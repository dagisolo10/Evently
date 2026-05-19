import { bulkUnlinkVendorsController, getAllEventVendorsController, getEventVendorsController, linkVendorToEventController, unlinkVendorController, updateEventVendorController } from "@/controllers/event-vendor-controller";
import { requireAuth } from "@/middlewares/auth";
import { validate } from "@/middlewares/validation";
import { Router } from "express";
import { bulkUnlinkVendorsSchema, eventVendorEventParamsSchema, eventVendorIdParamsSchema, linkVendorSchema, updateEventVendorSchema } from "@/validations/event-vendor-validation";

const router = Router();

router.use(requireAuth);

router.get("/", getAllEventVendorsController);
router.get("/:eventId", validate({ schema: eventVendorEventParamsSchema, type: "params" }), getEventVendorsController);
router.post("/link", validate({ schema: linkVendorSchema, type: "body" }), linkVendorToEventController);
router.post("/bulk-unlink", validate({ schema: bulkUnlinkVendorsSchema, type: "body" }), bulkUnlinkVendorsController);
router.put("/:id", validate({ schema: eventVendorIdParamsSchema, type: "params" }), validate({ schema: updateEventVendorSchema, type: "body" }), updateEventVendorController);
router.delete("/:id", validate({ schema: eventVendorIdParamsSchema, type: "params" }), unlinkVendorController);

export default router;
