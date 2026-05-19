import type { Request, Response } from "express";
import { isServiceError } from "@/types/response";
import { archiveGlobalVendor, bulkArchiveGlobalVendors, createGlobalVendor, getGlobalVendors, updateGlobalVendor, } from "@/services/global-vendor-services";

export async function archiveGlobalVendorController(req: Request, res: Response) {
    try {
        const { id } = req.params as { id: string };
        const result = await archiveGlobalVendor(id);

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function bulkArchiveGlobalVendorsController(req: Request, res: Response) {
    try {
        const result = await bulkArchiveGlobalVendors(req.body.ids);

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function createGlobalVendorController(req: Request, res: Response) {
    try {
        const result = await createGlobalVendor(req.body);

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function getGlobalVendorsController(_req: Request, res: Response) {
    try {
        const result = await getGlobalVendors();

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function updateGlobalVendorController(req: Request, res: Response) {
    try {
        const { id } = req.params as { id: string };
        const result = await updateGlobalVendor({ id, ...req.body });

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
