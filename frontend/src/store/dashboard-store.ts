import { create } from "zustand";
import type { DashboardStats } from "@/types/models/stats";

interface DashboardStore {
    dashboardStats: DashboardStats;
    setDashboardStats: (stats: DashboardStats) => void;
}

const dashboardStore = create<DashboardStore>((set) => ({
    dashboardStats: {
        activeEventsCount: 0,
        vendorDebt: 0,
        uncollected: 0,
        urgentTasks: 0,
    },

    setDashboardStats: (stats) => set({ dashboardStats: stats }),
}));

export default dashboardStore;
