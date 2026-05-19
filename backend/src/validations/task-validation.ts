import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional().nullable(),
    assignedTo: z.string().optional().nullable(),
    status: z.enum(["Pending", "InProgress", "Done"] as const, { message: "Status is required" }),
    dueDate: z.coerce.date({ message: "Due date is required" }),
    priority: z.enum(["Urgent", "High", "Medium", "Low"] as const, { message: "Priority is required" }),
    eventId: z.string().min(1, "Event ID is required"),
});

export const updateTaskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional().nullable(),
    assignedTo: z.string().optional().nullable(),
    status: z.enum(["Pending", "InProgress", "Done"] as const, { message: "Status is required" }),
    dueDate: z.coerce.date({ message: "Due date is required" }),
    priority: z.enum(["Urgent", "High", "Medium", "Low"] as const, { message: "Priority is required" }),
    eventId: z.string().min(1, "Event ID is required"),
});

export const taskIdParamsSchema = z.object({
    id: z.string().min(1, "Task ID is required"),
});

export const eventIdParamsSchema = z.object({
    eventId: z.string().min(1, "Event ID is required"),
});

export const completeTaskSchema = z.object({
    eventId: z.string().min(1, "Event ID is required"),
});

export const deleteTaskQuerySchema = z.object({
    eventId: z.string().min(1, "Event ID is required"),
});
