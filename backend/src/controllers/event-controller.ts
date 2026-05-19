import type { Request, Response } from "express";
import { isServiceError } from "@/types/response";
import { createEvent, deleteEvent, getEvent, getEventActivities, getEvents, getPopulatedEvent, updateEvent } from "@/services/event-services";

export async function createEventController(req: Request, res: Response) {
    try {
        const result = await createEvent(req.body);

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function deleteEventController(req: Request, res: Response) {
    try {
        const { id } = req.params as { id: string };
        const result = await deleteEvent(id);

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function getEventActivitiesController(req: Request, res: Response) {
    try {
        const { id } = req.params as { id: string };
        const result = await getEventActivities(id);

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function getEventController(req: Request, res: Response) {
    try {
        const { id } = req.params as { id: string };
        const result = await getEvent(id);

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function getEventsController(_req: Request, res: Response) {
    try {
        const result = await getEvents();

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function getPopulatedEventController(req: Request, res: Response) {
    try {
        const { id } = req.params as { id: string };
        const result = await getPopulatedEvent(id);

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function updateEventController(req: Request, res: Response) {
    try {
        const { id } = req.params as { id: string };
        const result = await updateEvent({ id, ...req.body });

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
