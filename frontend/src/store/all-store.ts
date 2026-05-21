import { create } from "zustand";
import type { User } from "@/types/models/user";
import type { Event } from "@/types/models/event";
import type { Payment } from "@/types/models/payment";
import type { DashboardStats } from "@/types/models/stats";
import type { PopulatedTask, Task } from "@/types/models/task";
import type { GlobalVendor } from "@/types/models/global-vendor";
import type { PopulatedEventVendor } from "@/types/models/event-vendor";

interface Store {
    user: User | null;
    events: Event[];
    activeTasks: Task[];
    payments: Payment[];
    tasks: PopulatedTask[];
    globalVendors: GlobalVendor[];
    dashboardStats: DashboardStats;
    eventVendors: PopulatedEventVendor[];

    loading: boolean;

    setUser: (user: User) => void;
    setEvents: (events: Event[]) => void;
    setActiveTasks: (tasks: Task[]) => void;
    setDashboardStats: (stats: DashboardStats) => void;
}

const allStore = create<Store>((set) => ({
    user: null,
    tasks: [],
    events: [],
    payments: [],
    activeTasks: [],
    eventVendors: [],
    globalVendors: [],
    dashboardStats: {
        vendorDebt: 0,
        uncollected: 0,
        urgentTasks: 0,
        activeEventsCount: 0,
    },
    loading: false,

    setUser: (user) => set({ user }),
    setEvents: (events) => set({ events }),
    setDashboardStats: (dashboardStats) => set({ dashboardStats }),
    setActiveTasks: (activeTasks) => set({ activeTasks }),
}));

export default allStore;
