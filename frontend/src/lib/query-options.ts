import { eventApi } from "@/lib/api/routes/event";
import { eventVendorApi } from "@/lib/api/routes/event-vendor";
import { globalVendorApi } from "@/lib/api/routes/global-vendor";
import { paymentApi } from "@/lib/api/routes/payment";
import { statsApi } from "@/lib/api/routes/stats";
import { taskApi } from "@/lib/api/routes/task";
import { userApi } from "@/lib/api/routes/user";
import type { Activity } from "@/types/models/activity";
import type { Event } from "@/types/models/event";
import type { PopulatedEventVendor } from "@/types/models/event-vendor";
import type { GlobalVendor } from "@/types/models/global-vendor";
import type { Payment } from "@/types/models/payment";
import type { DashboardStats, EventFinanceStats, EventStats, FinanceStats } from "@/types/models/stats";
import type { Task } from "@/types/models/task";
import type { PopulatedUser } from "@/types/models/user";
import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";

type EventParams = { id: string };

type QueryOptions<TQueryFnData, TData = TQueryFnData, TError = Error> = Omit<UseQueryOptions<TQueryFnData, TError, TData>, "queryKey" | "queryFn">;

export function syncUserQueryOptions<TData = PopulatedUser, TError = Error>(options?: QueryOptions<PopulatedUser, TData, TError>) {
    return queryOptions({
        ...options,
        queryKey: ["user"],
        queryFn: userApi.me,
    });
}

export function eventsQueryOptions<TData = Event[], TError = Error>(options?: QueryOptions<Event[], TData, TError>) {
    return queryOptions({
        ...options,
        queryKey: ["events"],
        queryFn: eventApi.list,
    });
}

export function paymentsQueryOptions<TData = { payments: Payment[] }, TError = Error>(
    options?: QueryOptions<{ payments: Payment[] }, TData, TError>,
) {
    return queryOptions({
        ...options,
        queryKey: ["payments"],
        queryFn: paymentApi.list,
    });
}

export function financeStatsQueryOptions<TData = FinanceStats, TError = Error>(options?: QueryOptions<FinanceStats, TData, TError>) {
    return queryOptions({
        ...options,
        queryKey: ["financeStats"],
        queryFn: statsApi.getFinance,
    });
}

export function eventVendorsQueryOptions<TData = { eventVendors: PopulatedEventVendor[] }, TError = Error>(
    options?: QueryOptions<{ eventVendors: PopulatedEventVendor[] }, TData, TError>,
) {
    return queryOptions({
        ...options,
        queryKey: ["eventVendors"],
        queryFn: eventVendorApi.list,
    });
}

export function globalVendorsQueryOptions<TData = { globalVendors: GlobalVendor[] }, TError = Error>(
    options?: QueryOptions<{ globalVendors: GlobalVendor[] }, TData, TError>,
) {
    return queryOptions({
        ...options,
        queryKey: ["globalVendors"],
        queryFn: globalVendorApi.list,
    });
}

export function dashboardStatsQueryOptions<TData = DashboardStats, TError = Error>(options?: QueryOptions<DashboardStats, TData, TError>) {
    return queryOptions({
        ...options,
        queryKey: ["dashboardStats"],
        queryFn: statsApi.getDashboard,
    });
}

export const eventDetailQueryOptions = {
    detail: <TData = Event, TError = Error>({ id }: EventParams, options?: QueryOptions<Event, TData, TError>) =>
        queryOptions({
            ...options,
            queryKey: ["event", id],
            queryFn: () => eventApi.get(id),
        }),

    stats: <TData = EventStats, TError = Error>({ id }: EventParams, options?: QueryOptions<EventStats, TData, TError>) =>
        queryOptions({
            ...options,
            queryKey: ["eventStats", id],
            queryFn: () => eventApi.getStats(id),
        }),

    activities: <TData = { activity: Activity[] }, TError = Error>(
        { id }: EventParams,
        options?: QueryOptions<{ activity: Activity[] }, TData, TError>,
    ) =>
        queryOptions({
            ...options,
            queryKey: ["activities", id],
            queryFn: () => eventApi.getActivities(id),
        }),

    activeTasks: <TData = { tasks: Task[] }, TError = Error>({ id }: EventParams, options?: QueryOptions<{ tasks: Task[] }, TData, TError>) =>
        queryOptions({
            ...options,
            queryKey: ["activeTasks", id],
            queryFn: () => taskApi.getActiveByEvent(id),
        }),

    eventPayments: <TData = { payments: Payment[] }, TError = Error>(
        { id }: EventParams,
        options?: QueryOptions<{ payments: Payment[] }, TData, TError>,
    ) =>
        queryOptions({
            ...options,
            queryKey: ["eventPayments", id],
            queryFn: () => paymentApi.getByEvent(id),
        }),

    eventVendors: <TData = { eventVendors: PopulatedEventVendor[] }, TError = Error>(
        { id }: EventParams,
        options?: QueryOptions<{ eventVendors: PopulatedEventVendor[] }, TData, TError>,
    ) =>
        queryOptions({
            ...options,
            queryKey: ["eventVendors", id],
            queryFn: () => eventVendorApi.getByEvent(id),
        }),

    eventFinancialStats: <TData = EventFinanceStats, TError = Error>({ id }: EventParams, options?: QueryOptions<EventFinanceStats, TData, TError>) =>
        queryOptions({
            ...options,
            queryKey: ["eventFinanceStats", id],
            queryFn: () => eventApi.getFinanceStats(id),
        }),
};
