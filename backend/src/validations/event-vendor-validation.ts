import { z } from "zod";

export const linkVendorSchema = z.object({
    cost: z.number().positive("Cost must be positive"),
    deposit: z.number().min(0, "Deposit cannot be negative"),
    dueDate: z.coerce.date({ message: "Due date is required" }),
    eventId: z.string().min(1, "Event ID is required"),
    globalVendorId: z.string().min(1, "Global vendor ID is required"),
});

export const updateEventVendorSchema = z.object({
    eventId: z.string().min(1, "Event ID is required"),
    cost: z.number().positive("Cost must be positive"),
    dueDate: z.coerce.date({ message: "Due date is required" }),
});

export const eventVendorIdParamsSchema = z.object({
    id: z.string().min(1, "Event vendor ID is required"),
});

export const eventVendorEventParamsSchema = z.object({
    eventId: z.string().min(1, "Event ID is required"),
});

export const bulkUnlinkVendorsSchema = z.object({
    eventVendorIds: z.array(z.string()).min(1, "At least one vendor ID is required"),
    eventId: z.string().min(1, "Event ID is required"),
});
