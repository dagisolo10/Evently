import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/request-context";
import type { ServiceResult } from "@/types/response";

interface FinanceStats {
    budget: number;
    collected: number;
    liability: number;
    paidOut: number;
    cashOnHand: number;
    profit: number;
    margin: string | number;
}

export default async function getFinanceStats(): ServiceResult<FinanceStats> {
    try {
        const userId = getUserId();

        const totalBudget = await prisma.event.aggregate({
            where: { userId },
            _sum: { budget: true },
        });

        const totalClientPaid = await prisma.payment.aggregate({
            where: {
                userId,
                type: "Client",
            },
            _sum: { amount: true },
        });

        const totalVendorExpense = await prisma.eventVendor.aggregate({
            where: {
                event: { userId },
            },
            _sum: { cost: true },
        });

        const totalVendorPaid = await prisma.payment.aggregate({
            where: {
                userId,
                type: "Vendor",
            },
            _sum: { amount: true },
        });

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
