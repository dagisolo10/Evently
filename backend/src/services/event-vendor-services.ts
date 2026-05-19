import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/request-context";
import { addActivity } from "@/services/activity-services";
import type { ServiceResult } from "@/types/response";
import type { EventVendor } from "@prisma/client";

interface LinkVendorToEventPayload {
    cost: number;
    deposit: number;
    dueDate: Date;
    eventId: string;
    globalVendorId: string;
}

interface UpdateEventVendorPayload {
    id: string;
    eventId: string;
    cost: number;
    dueDate: Date;
}

export async function bulkUnlinkVendors(eventVendorIds: string[], eventId: string): ServiceResult<void> {
    try {
        await prisma.$transaction(async (tx) => {
            await tx.payment.deleteMany({
                where: { eventVendorId: { in: eventVendorIds }, eventId },
            });

            await tx.eventVendor.deleteMany({
                where: { id: { in: eventVendorIds }, eventId },
            });
        });
    } catch (err) {
        console.error(err);
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}

export async function getAllEventVendors(): ServiceResult<{ eventVendors: EventVendor[] }> {
    try {
        const userId = getUserId();

        const eventVendors = await prisma.eventVendor.findMany({
            where: { event: { userId } },
            include: { payments: true, globalVendor: true },
        });

        return { eventVendors };
    } catch (err) {
        console.error(err);
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}

export async function getEventVendors(id: string): ServiceResult<{ eventVendors: EventVendor[] }> {
    try {
        const userId = getUserId();

        const eventVendors = await prisma.eventVendor.findMany({
            where: { event: { userId }, eventId: id },
            include: { payments: true, globalVendor: true },
        });

        return { eventVendors };
    } catch {
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}

export async function linkVendorToEvent(data: LinkVendorToEventPayload): ServiceResult<{ eventVendor: EventVendor }> {
    try {
        const userId = getUserId();

        const result = await prisma.$transaction(async (tx) => {
            const existingLink = await tx.eventVendor.findFirst({
                where: {
                    eventId: data.eventId,
                    globalVendorId: data.globalVendorId,
                },
            });

            if (existingLink) throw new Error("Vendor already added to this event");
            if (data.deposit > data.cost) throw new Error("Deposit cannot exceed cost.");

            const newEventVendor = await tx.eventVendor.create({
                data: {
                    cost: data.cost,
                    deposit: data.deposit,
                    dueDate: data.dueDate,
                    eventId: data.eventId,
                    globalVendorId: data.globalVendorId,
                },
                include: { globalVendor: true, event: true },
            });

            if (data.deposit > 0) {
                await tx.payment.create({
                    data: {
                        amount: data.deposit,
                        type: "Vendor",
                        dueDate: data.dueDate,
                        eventId: data.eventId,
                        description: "Initial deposit",
                        eventVendorId: newEventVendor.id,
                        userId,
                    },
                });
            }

            return newEventVendor;
        });

        await addActivity({
            type: "VendorAdded",
            eventId: data.eventId,
            message: `Strategic partnership formed with ${result.globalVendor.name}`,
        });

        return { eventVendor: result };
    } catch (err) {
        console.error(err);
        if (err instanceof Error) {
            if (err.message.includes("already")) return { error: err.message, code: 409 };
            if (err.message.includes("not found")) return { error: err.message, code: 404 };
            return { error: err.message, code: 400 };
        }
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}

export async function unlinkVendor(eventVendorId: string, eventId: string): ServiceResult<void> {
    try {
        await prisma.$transaction(async (tx) => {
            await tx.payment.deleteMany({
                where: { eventVendorId, eventId },
            });

            await tx.eventVendor.delete({
                where: { id: eventVendorId, eventId },
            });
        });
    } catch {
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}

export async function updateEventVendor(data: UpdateEventVendorPayload): ServiceResult<{ eventVendor: EventVendor }> {
    try {
        const userId = getUserId();
        const { id, eventId, ...updateData } = data;

        const result = await prisma.$transaction(async (trx) => {
            const eventVendor = await trx.eventVendor.findFirst({
                where: { id, eventId, event: { userId } },
            });

            if (!eventVendor) throw new Error("Event Vendor not found");

            return await trx.eventVendor.update({
                where: { id, eventId, event: { userId } },
                data: updateData,
                include: { globalVendor: true },
            });
        });

        await addActivity({
            type: "VendorUpdated",
            eventId: data.eventId,
            message: `Updated agreement details for ${result.globalVendor.name}`,
        });

        return { eventVendor: result };
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
