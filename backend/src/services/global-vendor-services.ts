import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/request-context";
import type { ServiceResult } from "@/types/response";
import type { GlobalVendor } from "@prisma/client";

interface UpdateGlobalVendorPayload {
    id: string;
    name: string;
    category: string;
    website?: string | null;
    contact?: string | null;
    email?: string | null;
}

interface CreateGlobalVendorPayload {
    name: string;
    category: string;
    website?: string | null;
    contact?: string | null;
    email?: string | null;
}

export async function archiveGlobalVendor(id: string): ServiceResult<{ globalVendor: GlobalVendor }> {
    try {
        const userId = getUserId();

        const result = await prisma.$transaction(async (trx) => {
            const globalVendor = await trx.globalVendor.findFirst({ where: { id, userId } });

            if (!globalVendor) throw new Error("Global vendor not found");

            return await trx.globalVendor.update({
                where: { id },
                data: { isActive: false },
            });
        });

        return { globalVendor: result };
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

export async function bulkArchiveGlobalVendors(ids: string[]): ServiceResult<{ count: number }> {
    try {
        const userId = getUserId();

        if (!ids || ids.length === 0) return { error: "No vendor IDs provided", code: 400 };

        const result = await prisma.$transaction(async (trx) => {
            const updateResult = await trx.globalVendor.updateMany({
                where: {
                    id: { in: ids },
                    userId: userId,
                },
                data: { isActive: false },
            });

            return updateResult;
        });

        return { count: result.count };
    } catch (err) {
        console.error(err);
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}

export async function createGlobalVendor(data: CreateGlobalVendorPayload): ServiceResult<{ globalVendor: GlobalVendor }> {
    try {
        const userId = getUserId();

        const globalVendor = await prisma.globalVendor.create({ data: { ...data, userId } });

        return { globalVendor };
    } catch (err) {
        console.error(err);
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}

export async function getGlobalVendors(): ServiceResult<{ globalVendors: GlobalVendor[] }> {
    try {
        const userId = getUserId();

        return { globalVendors: await prisma.globalVendor.findMany({ where: { userId, isActive: true } }) };
    } catch (err) {
        console.error(err);
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}

export async function updateGlobalVendor(data: UpdateGlobalVendorPayload): ServiceResult<{ globalVendor: GlobalVendor }> {
    try {
        const userId = getUserId();

        const result = await prisma.$transaction(async (trx) => {
            const globalVendor = await trx.globalVendor.findFirst({
                where: { id: data.id, userId, isActive: true },
            });

            if (!globalVendor) throw new Error("Global vendor not found");

            const { id, ...updateData } = data;

            return await trx.globalVendor.update({
                where: { id, userId, isActive: true },
                data: updateData,
            });
        });

        return { globalVendor: result };
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
