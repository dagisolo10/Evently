import { eventApi } from "@/lib/api/routes/event";
import { eventVendorApi } from "@/lib/api/routes/event-vendor";
import { globalVendorApi } from "@/lib/api/routes/global-vendor";
import { paymentApi } from "@/lib/api/routes/payment";
import { statsApi } from "@/lib/api/routes/stats";
import { taskApi } from "@/lib/api/routes/task";
import { userApi } from "@/lib/api/routes/user";
import { queryOptions } from "@tanstack/react-query";

type EventParams = { id: string };

export const userQueryOptions = () =>
    queryOptions({
        queryKey: ["user"],
        queryFn: userApi.me,
    });

export const eventsQueryOptions = () =>
    queryOptions({
        queryKey: ["events"],
        queryFn: eventApi.list,
    });

export const paymentsQueryOptions = () =>
    queryOptions({
        queryKey: ["payments"],
        queryFn: paymentApi.list,
    });

export const financeStatsQueryOptions = () =>
    queryOptions({
        queryKey: ["financeStats"],
        queryFn: statsApi.getFinance,
    });

export const eventVendorsQueryOptions = () =>
    queryOptions({
        queryKey: ["eventVendors"],
        queryFn: eventVendorApi.list,
    });

export const globalVendorsQueryOptions = () =>
    queryOptions({
        queryKey: ["globalVendors"],
        queryFn: globalVendorApi.list,
    });

export const dashboardStatsQueryOptions = () =>
    queryOptions({
        queryKey: ["dashboardStats"],
        queryFn: statsApi.getDashboard,
    });

export const eventDetailQueryOptions = {
    detail: ({ id }: EventParams) =>
        queryOptions({
            queryKey: ["event", id],
            queryFn: () => eventApi.get(id),
        }),
    stats: ({ id }: EventParams) =>
        queryOptions({
            queryKey: ["eventStats", id],
            queryFn: () => eventApi.getStats(id),
        }),
    activities: ({ id }: EventParams) =>
        queryOptions({
            queryKey: ["activities", id],
            queryFn: () => eventApi.getActivities(id),
        }),
    activeTasks: ({ id }: EventParams) =>
        queryOptions({
            queryKey: ["activeTasks", id],
            queryFn: () => taskApi.getActiveByEvent(id),
        }),
    eventPayments: ({ id }: EventParams) =>
        queryOptions({
            queryKey: ["eventPayments", id],
            queryFn: () => paymentApi.getByEvent(id),
        }),
    eventVendors: ({ id }: EventParams) =>
        queryOptions({
            queryKey: ["eventVendors", id],
            queryFn: () => eventVendorApi.getByEvent(id),
        }),
    eventFinancialStats: ({ id }: EventParams) =>
        queryOptions({
            queryKey: ["eventFinanceStats", id],
            queryFn: () => eventApi.getFinanceStats(id),
        }),
};
