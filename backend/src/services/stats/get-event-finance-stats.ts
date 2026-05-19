import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/request-context";
import type { ServiceResult } from "@/types/response";

interface EventFinanceStats {
    budget: number;
    collected: number;
    liability: number;
    paidOut: number;
    cashOnHand: number;
    profit: number;
    margin: string | number;
}

export default async function getEventFinanceStats(id: string): ServiceResult<EventFinanceStats> {
    try {
        const userId = getUserId();

        const totalBudgetQuery = prisma.event.aggregate({
            where: { userId, id },
            _sum: { budget: true },
        });

        const totalClientPaidQuery = prisma.payment.aggregate({
            where: {
                userId,
                eventId: id,
                type: "Client",
            },
            _sum: { amount: true },
        });

        const totalVendorExpenseQuery = prisma.eventVendor.aggregate({
            where: {
                event: { userId },
                eventId: id,
            },
            _sum: { cost: true },
        });

        const totalVendorPaidQuery = prisma.payment.aggregate({
            where: {
                userId,
                eventId: id,
                type: "Vendor",
            },
            _sum: { amount: true },
        });

        const [totalBudget, totalClientPaid, totalVendorExpense, totalVendorPaid] = await prisma.$transaction([totalBudgetQuery, totalClientPaidQuery, totalVendorExpenseQuery, totalVendorPaidQuery]);

        const budget = totalBudget._sum.budget || 0;
        const collected = totalClientPaid._sum.amount || 0;
        const liability = totalVendorExpense._sum.cost || 0;
        const paidOut = totalVendorPaid._sum.amount || 0;

        const cashOnHand = collected - paidOut;
        const profit = budget - liability;
        const margin = budget > 0 ? ((profit / budget) * 100).toFixed(1) : 0;

        return { budget, collected, liability, paidOut, cashOnHand, profit, margin };
    } catch {
        return {
            code: 500,
            error: "Internal server error",
        };
    }
}
