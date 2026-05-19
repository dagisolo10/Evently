import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/request-context";
import type { ServiceResult } from "@/types/response";
import { addActivity } from "@/services/activity-services";
import type { Priority, Task, TaskStatus } from "@prisma/client";

interface UpdateTaskPayload {
    id: string;
    eventId: string;
    title: string;
    description?: string | null;
    assignedTo?: string | null;
    status: TaskStatus;
    dueDate: Date;
    priority: Priority;
}

interface CreateTaskPayload {
    eventId: string;
    title: string;
    description?: string | null;
    assignedTo?: string | null;
    status: TaskStatus;
    dueDate: Date;
    priority: Priority;
}

export async function completeTask(data: { id: string; eventId: string }): ServiceResult<{ task: Task }> {
    try {
        const userId = getUserId();
        const { id, eventId } = data;

        const result = await prisma.$transaction(async (trx) => {
            const task = await trx.task.findFirst({
                where: {
                    id,
                    event: { userId },
                    eventId,
                },
            });

            if (!task) throw new Error("Task not found");

            return await trx.task.update({
                where: {
                    id,
                    event: { userId },
                },
                data: {
                    status: "Done",
                },
            });
        });

        await addActivity({
            type: "TaskCompleted",
            eventId: data.eventId,
            message: `Milestone reached: ${result.title}`,
        });

        return { task: result };
    } catch (err) {
        console.error(err);
        if (err instanceof Error) {
            if (err.message.includes("not found")) return { error: err.message, code: 404 };
            return { error: err.message, code: 400 };
        }
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}

export async function deleteTask(id: string, eventId: string): ServiceResult<void> {
    try {
        const userId = getUserId();

        await prisma.$transaction(async (trx) => {
            const task = await trx.task.findFirst({ where: { id, event: { userId }, eventId } });

            if (!task) throw new Error("Task not found");

            return await trx.task.delete({ where: { id } });
        });
    } catch (err) {
        console.error(err);
        if (err instanceof Error) {
            if (err.message.includes("not found")) return { error: err.message, code: 404 };
            return { error: err.message, code: 400 };
        }
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}

export async function getActiveTasks(id: string): ServiceResult<{ tasks: Task[] }> {
    try {
        const userId = getUserId();

        const tasks = await prisma.task.findMany({
            where: {
                event: { id, userId },
                status: { not: "Done" },
            },
        });

        return { tasks };
    } catch (err) {
        console.error(err);
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}

export async function createTask(data: CreateTaskPayload): ServiceResult<{ task: Task }> {
    try {
        const userId = getUserId();
        const { eventId, ...taskData } = data;

        const event = await prisma.event.findFirst({
            where: { id: eventId, userId },
        });

        if (!event) return { error: "Event not found or not in your list", code: 404 };

        const task = await prisma.task.create({
            data: {
                ...taskData,
                event: { connect: { id: eventId } },
            },
            include: { event: true },
        });

        await addActivity({
            type: "TaskCreated",
            eventId: data.eventId,
            message: `New milestone established: ${data.title}`,
        });

        return { task };
    } catch (err) {
        console.error(err);
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}

export async function getTasks(id: string): ServiceResult<{ tasks: Task[] }> {
    try {
        const userId = getUserId();

        const tasks = await prisma.task.findMany({
            where: {
                event: { id, userId },
            },
            include: { event: true },
        });

        return { tasks };
    } catch (err) {
        console.error(err);
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}

export async function updateTask(data: UpdateTaskPayload): ServiceResult<{ task: Task }> {
    try {
        const userId = getUserId();

        const result = await prisma.$transaction(async (trx) => {
            const { id, ...updateData } = data;

            const task = await trx.task.findFirst({
                where: {
                    id,
                    event: { id: data.eventId, userId },
                },
            });

            if (!task) throw new Error("Task not found");

            const updated = await trx.task.update({
                where: {
                    id,
                    event: { id: data.eventId, userId },
                },
                data: updateData,
            });

            if (task.status !== "Done" && updated.status === "Done") {
                await addActivity({
                    type: "TaskCompleted",
                    eventId: data.eventId,
                    message: `Milestone reached: ${data.title}`,
                });
            }

            return updated;
        });

        return { task: result };
    } catch (err) {
        console.error(err);
        if (err instanceof Error) {
            if (err.message.includes("not found")) return { error: err.message, code: 404 };
            return { error: err.message, code: 400 };
        }
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}
