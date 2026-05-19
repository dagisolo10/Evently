import type { Request, Response } from "express";
import { isServiceError } from "@/types/response";
import { bulkUnlinkVendors, getAllEventVendors, getEventVendors, linkVendorToEvent, unlinkVendor, updateEventVendor, } from "@/services/event-vendor-services";

export async function bulkUnlinkVendorsController(req: Request, res: Response) {
    try {
        const result = await bulkUnlinkVendors(req.body.eventVendorIds, req.body.eventId);

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json({ message: "Vendors unlinked successfully" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function getAllEventVendorsController(_req: Request, res: Response) {
    try {
        const result = await getAllEventVendors();

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function getEventVendorsController(req: Request, res: Response) {
    try {
        const { eventId } = req.params as { eventId: string };
        const result = await getEventVendors(eventId);

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function linkVendorToEventController(req: Request, res: Response) {
    try {
        const result = await linkVendorToEvent(req.body);

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function unlinkVendorController(req: Request, res: Response) {
    try {
        const { id } = req.params as { id: string };
        const result = await unlinkVendor(id, req.body.eventId);

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json({ message: "Vendor unlinked successfully" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function updateEventVendorController(req: Request, res: Response) {
    try {
        const { id } = req.params as { id: string };
        const result = await updateEventVendor({ id, ...req.body });

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
