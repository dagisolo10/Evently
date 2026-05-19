import type { Request, Response } from "express";
import { isServiceError } from "@/types/response";
import { addPayment, deletePayment, getEventPayments, getPayments, updatePayment } from "@/services/payment-services";

export async function addPaymentController(req: Request, res: Response) {
    try {
        const result = await addPayment(req.body);

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function deletePaymentController(req: Request, res: Response) {
    try {
        const { id } = req.params as { id: string };
        const result = await deletePayment(id);

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function getEventPaymentsController(req: Request, res: Response) {
    try {
        const { eventId } = req.params as { eventId: string };
        const result = await getEventPayments(eventId);

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function getPaymentsController(_req: Request, res: Response) {
    try {
        const result = await getPayments();

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function updatePaymentController(req: Request, res: Response) {
    try {
        const { id } = req.params as { id: string };
        const result = await updatePayment({ id, ...req.body });

        if (isServiceError(result)) {
            return res.status(result.code).json(result);
        }

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
