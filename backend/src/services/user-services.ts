import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/request-context";
import type { ServiceResult } from "@/types/response";
import { clerkClient } from "@clerk/express";
import type { User } from "@prisma/client";

interface UpdateUserPayload {
    name?: string;
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
            const clerkUser = await clerkClient.users.getUser(id);

            const name = clerkUser.fullName ?? `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() ?? "User";

            return prisma.user.create({
                data: {
                    id,
                    name,
                },
                include: {
                    events: true,
                    payments: true,
                    globalVendors: true,
                },
            });
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
