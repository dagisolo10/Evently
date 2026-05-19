import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/request-context";
import { addActivity } from "@/services/activity-services";
import type { ServiceResult } from "@/types/response";
import type { Payment, PaymentType } from "@prisma/client";

const formatUSD = (val: number) => {
    return val.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

interface CreatePaymentPayload {
    amount: number;
    type: PaymentType;
    dueDate: Date;
    eventId: string;
    description?: string | null;
    eventVendorId?: string | null;
}

interface UpdatePaymentPayload {
    id: string;
    type: PaymentType;
    amount: number;
    dueDate: Date;
    eventId: string;
    description?: string | null;
    eventVendorId?: string | null;
}

export async function addPayment(data: CreatePaymentPayload): ServiceResult<{ payment: Payment }> {
    try {
        const userId = getUserId();

        const payment = await prisma.payment.create({
            data: { userId, ...data },
        });

        await addActivity({
            type: "VendorPaid",
            eventId: data.eventId,
            message: `Processed ${data.type} of ${formatUSD(data.amount)}`,
        });

        return { payment };
    } catch (err) {
        console.error(err);
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}

export async function deletePayment(id: string): ServiceResult<{ payment: Payment }> {
    try {
        const userId = getUserId();

        const result = await prisma.$transaction(async (trx) => {
            const payment = await trx.payment.findFirst({ where: { id, event: { userId } } });

            if (!payment) throw new Error("Payment not found or unauthorized");

            return await trx.payment.delete({ where: { id } });
        });

        return { payment: result };
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

export async function getEventPayments(eventId: string): ServiceResult<{ payments: Payment[] }> {
    try {
        const userId = getUserId();

        const payments = await prisma.payment.findMany({
            where: { event: { userId }, eventId },
        });

        return { payments };
    } catch (err) {
        console.error(err);
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}

export async function getPayments(): ServiceResult<{ payments: Payment[] }> {
    try {
        const userId = getUserId();

        const payments = await prisma.payment.findMany({ where: { userId } });

        return { payments };
    } catch (err) {
        console.error(err);
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}

export async function updatePayment(data: UpdatePaymentPayload): ServiceResult<{ payment: Payment }> {
    try {
        const userId = getUserId();
        const { id, eventId, eventVendorId, type, ...updateData } = data;

        const result = await prisma.$transaction(async (trx) => {
            const existingPayment = await trx.payment.findFirst({
                where: {
                    id,
                    event: { userId },
                },
            });

            if (!existingPayment) throw new Error("Payment not found or unauthorized");

            return await trx.payment.update({
                where: { id },
                data: {
                    ...updateData,
                    type,
                    eventId,
                    eventVendorId: type === "Vendor" ? eventVendorId : null,
                },
            });
        });

        return { payment: result };
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
