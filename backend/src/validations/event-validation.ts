import { z } from "zod";

export const createEventSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z
        .string()
        .optional()
        .nullable()
        .transform((description) => {
            if (!description?.trim()) {
                return null;
            }
        }),
    clientName: z.string().min(1, "Client name is required"),
    clientEmail: z.string().email("Invalid email").optional().nullable(),
    startDate: z.coerce.date({ message: "Start date is required" }),
    endDate: z.coerce.date({ message: "End date is required" }),
    budget: z.number().positive("Budget must be positive"),
    location: z.string().min(1, "Location is required"),
});

export const updateEventSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional().nullable(),
    clientName: z.string().min(1, "Client name is required"),
    clientEmail: z.string().email("Invalid email").optional().nullable(),
    startDate: z.coerce.date({ message: "Start date is required" }),
    endDate: z.coerce.date({ message: "End date is required" }),
    budget: z.number().positive("Budget must be positive"),
    location: z.string().min(1, "Location is required"),
});

export const eventIdParamsSchema = z.object({
    id: z.string().min(1, "Event ID is required"),
});
