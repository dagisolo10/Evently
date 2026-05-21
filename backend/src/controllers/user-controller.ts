import { createUser, getUser, updateUser } from "@/services/user-services";
import { isServiceError } from "@/types/response";
import type { Request, Response } from "express";

export async function getUserController(_req: Request, res: Response) {
    try {
        const result = await getUser();

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function createUserController(req: Request, res: Response) {
    try {
        const result = await createUser(req.body);

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function updateUserController(req: Request, res: Response) {
    try {
        const result = await updateUser(req.body);

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
