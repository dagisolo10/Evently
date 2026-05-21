export interface DashboardStats {
    activeEventsCount: number;
    vendorDebt: number;
    uncollected: number;
    urgentTasks: number;
}

export interface FinanceStats {
    budget: number;
    collected: number;
    liability: number;
    paidOut: number;
    cashOnHand: number;
    profit: number;
    margin: string | number;
}

export interface EventStats {
    budget: number;
    totalContracted: number;
    totalPaidToVendor: number;
    remainingBudget: number;
    remainingBalance: number;
    pendingBalance: number;
    utilizationPercentage: number;
    isOverBudget: boolean;
    paidVendorsCount: number;
    totalTasksCount: number;
    completedTasksCount: number;
    pendingTasksCount: number;
    overdueVendorsCount: number;
    paymentCompletion: number;
    taskCompletion: number;
}

export interface EventFinanceStats {
    budget: number;
    collected: number;
    liability: number;
    paidOut: number;
    cashOnHand: number;
    profit: number;
    margin: string | number;
}
