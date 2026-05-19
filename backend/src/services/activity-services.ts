import prisma from "@/lib/prisma";
import type { ServiceResult } from "@/types/response";
import type { Activity, ActivityType } from "@prisma/client";

export async function addActivity(data: { type: ActivityType; message: string; eventId: string }): ServiceResult<Activity> {
    try {
        const activity = await prisma.activity.create({
            data: {
                type: data.type,
                message: data.message,
                eventId: data.eventId,
            },
        });

        return activity;
    } catch {
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}
