import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/request-context";
import type { ServiceResult } from "@/types/response";

interface DashboardStats {
    activeEventsCount: number;
    vendorDebt: number;
    uncollected: number;
    urgentTasks: number;
}

export default async function dashboardStats(): ServiceResult<DashboardStats> {
    try {
        const userId = getUserId();

        const activeEventsCountQuery = prisma.event.count({
            where: {
                userId,
                endDate: {
                    gt: new Date(),
                },
            },
        });

        const totalVendorExpenseQuery = prisma.eventVendor.aggregate({
            where: {
                event: {
                    userId,
                },
            },
            _sum: {
                cost: true,
            },
        });

        const totalPaidToVendorsQuery = prisma.payment.aggregate({
            where: {
                event: {
                    userId,
                },
                type: "Vendor",
            },
            _sum: {
                amount: true,
            },
        });

        const totalBudgetQuery = prisma.event.aggregate({
            where: {
                userId,
            },
            _sum: {
                budget: true,
            },
        });

        const clientPaidQuery = prisma.payment.aggregate({
            where: {
                event: {
                    userId,
                },
                type: "Client",
            },
            _sum: {
                amount: true,
            },
        });

        const urgentTasksQuery = prisma.task.count({
            where: {
                event: {
                    userId,
                },
                status: {
                    not: "Done",
                },
                dueDate: {
                    lte: new Date(),
                },
            },
        });

        const [activeEventsCount, totalVendorExpense, totalPaidToVendors, totalBudget, clientPaid, urgentTasks] = await prisma.$transaction([activeEventsCountQuery, totalVendorExpenseQuery, totalPaidToVendorsQuery, totalBudgetQuery, clientPaidQuery, urgentTasksQuery]);

        const vendorDebt = (totalVendorExpense._sum.cost || 0) - (totalPaidToVendors._sum.amount || 0);
        const uncollected = (totalBudget._sum.budget || 0) - (clientPaid._sum.amount || 0);

        return {
            activeEventsCount,
            vendorDebt,
            uncollected,
            urgentTasks,
        };
    } catch {
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}
