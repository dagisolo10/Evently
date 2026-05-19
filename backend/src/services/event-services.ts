import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/request-context";
import type { ServiceResult, SuccessMessage } from "@/types/response";
import type { Activity, Event } from "@prisma/client";

interface CreatePayload {
    title: string;
    description?: string | null;
    clientName: string;
    clientEmail?: string | null;
    startDate: Date;
    endDate: Date;
    budget: number;
    location: string;
}

interface UpdatePayload {
    id: string;
    title: string;
    description?: string | null;
    clientName: string;
    clientEmail?: string | null;
    startDate: Date;
    endDate: Date;
    budget: number;
    location: string;
}

export async function createEvent(data: CreatePayload): ServiceResult<{ event: Event }> {
    try {
        const userId = getUserId();

        const invalidDate = data.endDate.getTime() < data.startDate.getTime();

        if (invalidDate) return { error: "End date can't be before start date.", code: 400 };

        const event = await prisma.event.create({
            data: {
                userId,
                ...data,
            },
        });

        return { event };
    } catch (err) {
        console.error(err);
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}

export async function deleteEvent(id: string): ServiceResult<SuccessMessage> {
    try {
        const userId = getUserId();

        await prisma.$transaction(async (trx) => {
            const event = await trx.event.findFirst({
                where: {
                    id,
                    userId,
                },
            });

            if (!event) throw new Error("Event not found or not in your list");

            await trx.event.delete({
                where: {
                    id,
                    userId,
                },
            });
        });

        return { message: "Event deleted successfully" };
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

export async function getEventActivities(id: string): ServiceResult<{ activity: Activity[] }> {
    try {
        const userId = getUserId();

        const activity = await prisma.activity.findMany({
            where: {
                event: {
                    id,
                    userId,
                },
            },
        });

        return { activity };
    } catch (err) {
        console.error(err);
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}

export async function getEvent(id: string): ServiceResult<{ event: Event | null }> {
    try {
        const userId = getUserId();

        const event = await prisma.event.findFirst({
            where: {
                id,
                userId,
            },
        });

        if (!event) return { error: "Event not found or not in your list", code: 404 };

        return { event };
    } catch (err) {
        console.error(err);
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}

export async function getEvents(): ServiceResult<Event[]> {
    try {
        const userId = getUserId();

        const events = await prisma.event.findMany({
            where: {
                userId,
            },
        });

        return events;
    } catch (err) {
        console.error(err);
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}

export async function getPopulatedEvent(id: string): ServiceResult<{ event: Event | null }> {
    try {
        const userId = getUserId();

        const event = await prisma.event.findFirst({
            where: {
                id,
                userId,
            },
            include: {
                payments: {
                    include: {
                        vendor: {
                            include: {
                                globalVendor: true,
                            },
                        },
                    },
                    orderBy: {
                        dueDate: "asc",
                    },
                },
            },
        });

        return { event };
    } catch {
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}

export async function updateEvent(data: UpdatePayload): ServiceResult<{ event: Event }> {
    try {
        const userId = getUserId();

        const result = await prisma.$transaction(async (trx) => {
            const invalidDate = data.endDate.getTime() < data.startDate.getTime();

            if (invalidDate) throw new Error("End date can't be before start date.");

            const { id, ...updateData } = data;

            const event = await trx.event.findFirst({ where: { id, userId } });

            if (!event) throw new Error("Event not found or not in your list");

            return await trx.event.update({
                where: {
                    id,
                    userId,
                },
                data: updateData,
            });
        });

        return { event: result };
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
