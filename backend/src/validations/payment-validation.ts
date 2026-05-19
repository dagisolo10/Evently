import { z } from "zod";

export const createPaymentSchema = z.object({
    amount: z.number().positive("Amount must be positive"),
    type: z.enum(["Client", "Vendor"] as const, { message: "Payment type is required" }),
    dueDate: z.coerce.date({ message: "Due date is required" }),
    eventId: z.string().min(1, "Event ID is required"),
    description: z.string().optional().nullable(),
    eventVendorId: z.string().optional().nullable(),
});

export const updatePaymentSchema = z.object({
    type: z.enum(["Client", "Vendor"] as const, { message: "Payment type is required" }),
    amount: z.number().positive("Amount must be positive"),
    dueDate: z.coerce.date({ message: "Due date is required" }),
    eventId: z.string().min(1, "Event ID is required"),
    description: z.string().optional().nullable(),
    eventVendorId: z.string().optional().nullable(),
});

export const paymentIdParamsSchema = z.object({
    id: z.string().min(1, "Payment ID is required"),
});

export const eventIdParamsSchema = z.object({
    eventId: z.string().min(1, "Event ID is required"),
});
