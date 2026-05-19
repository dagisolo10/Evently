import type { Request, Response } from "express";
import { isServiceError } from "@/types/response";
import { completeTask, createTask, deleteTask, getActiveTasks, getTasks, updateTask } from "@/services/task-services";

export async function completeTaskController(req: Request, res: Response) {
    try {
        const { id } = req.params as { id: string };
        const result = await completeTask({ id, ...req.body });

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function deleteTaskController(req: Request, res: Response) {
    try {
        const { id } = req.params as { id: string };
        const { eventId } = req.query as { eventId: string };
        const result = await deleteTask(id, eventId);

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function getActiveTasksController(req: Request, res: Response) {
    try {
        const { eventId } = req.params as { eventId: string };
        const result = await getActiveTasks(eventId);

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function getTasksController(req: Request, res: Response) {
    try {
        const { eventId } = req.params as { eventId: string };
        const result = await getTasks(eventId);

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function createTaskController(req: Request, res: Response) {
    try {
        const result = await createTask({ ...req.body });

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function updateTaskController(req: Request, res: Response) {
    try {
        const { id } = req.params as { id: string };
        const result = await updateTask({ id, ...req.body });

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
