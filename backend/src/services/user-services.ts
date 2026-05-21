import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/request-context";
import type { ServiceResult } from "@/types/response";
import type { User } from "@prisma/client";

interface CreateUserPayload {
    name: string;
}

interface UpdateUserPayload {
    name?: string;
}

export async function createUser(data: CreateUserPayload): ServiceResult<User> {
    try {
        const userId = getUserId();

        const existing = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                events: true,
                payments: true,
                globalVendors: true,
            },
        });

        if (existing) {
            return existing;
        }

        const user = await prisma.user.create({
            data: {
                id: userId,
                ...data,
            },
            include: {
                events: true,
                payments: true,
                globalVendors: true,
            },
        });

        return user;
    } catch (err) {
        console.error(err);
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}

export async function updateUser(data: UpdateUserPayload): ServiceResult<User> {
    try {
        const userId = getUserId();

        const existing = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
            },
        });

        if (!existing) {
            return { error: "User not found", code: 404 };
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data,
            include: {
                events: true,
                payments: true,
                globalVendors: true,
            },
        });

        return updatedUser;
    } catch (err) {
        console.error(err);
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}

export async function getUser(): ServiceResult<User> {
    try {
        const id = getUserId();

        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                events: true,
                globalVendors: true,
                payments: true,
            },
        });

        if (!user) {
            return { error: "User not found", code: 404 };
        }

        return user;
    } catch (error) {
        console.error(error);
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}
