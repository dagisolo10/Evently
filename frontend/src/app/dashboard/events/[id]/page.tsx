"use client";

import UniversalDeleteDialog from "@/components/common/universal-alert-dialog";
import ActivityCard from "@/components/event/activity-card";
import BudgetTracker from "@/components/event/budget-tracker";
import DirectAccess from "@/components/event/direct-access";
import EventPulse from "@/components/event/event-pulse";
import OverviewCard from "@/components/event/overview-cards";
import StatCard from "@/components/event/stats-card";
import SummaryCard from "@/components/event/summary-card";
import TimelineItem from "@/components/event/timeline-item";
import { PageSkeleton } from "@/components/page-skeletons";
import ExportButton from "@/components/payment/export-button";
import { TaskSheet } from "@/components/tasks/task-sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { statusColors } from "@/constants/status-colors";
import { getEventStatus } from "@/helper/get-status";
import { formatDate } from "@/helper/helper-functions";
import { eventDetailQueryOptions, eventsQueryOptions } from "@/lib/query-options";
import type { TaskStatus } from "@/types/models/task";
import { IconCash, IconCurrencyDollar } from "@tabler/icons-react";
import { useQueries } from "@tanstack/react-query";
import {
    ArrowUpRight,
    Briefcase,
    Calendar,
    CheckCircle,
    CheckCircle2,
    Clock,
    DollarSign,
    Landmark,
    MapPin,
    MoreHorizontal,
    PlusCircle,
    ReceiptText,
    Sparkles,
    Truck,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EventDetailsPage() {
    const { id } = useParams<{ id: string }>();

    const queries = useQueries({
        queries: [
            eventsQueryOptions(),
            eventDetailQueryOptions.detail({ id }),
            eventDetailQueryOptions.stats({ id }),
            eventDetailQueryOptions.activeTasks({ id }),
            eventDetailQueryOptions.activities({ id }),
            eventDetailQueryOptions.eventVendors({ id }),
        ],
    });

    const events = queries[0].data ?? [];
    const event = queries[1].data;
    const stats = queries[2].data;
    const activeTasks = queries[3].data?.tasks ?? [];
    const activity = queries[4].data?.activity ?? [];
    const eventVendors = queries[5].data?.eventVendors ?? [];
    const isPending = queries.some((q) => q.isPending);

    if (isPending || !event || !stats) {
        return <PageSkeleton tag="event-details" />;
    }

    const eventStatus = getEventStatus(event.startDate, event.endDate);

    return (
        <main className="space-y-10 pb-16">
            <header className="relative flex flex-col justify-between gap-8 border-b border-zinc-200/60 pb-10 md:flex-row md:items-end dark:border-zinc-800/60">
                <div className="bg-primary/5 pointer-events-none absolute -top-24 -left-24 hidden size-96 blur-[120px] dark:block" />

                <div className="space-y-6">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <div className="bg-primary/10 text-primary flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black tracking-widest uppercase">
                            <Sparkles className="size-3" />
                            Prestige Event
                        </div>
                        <span className="text-zinc-300 dark:text-zinc-700">/</span>
                        <span className="text-muted-foreground text-sm font-bold tracking-tight">{event.clientName}</span>
                    </div>

                    <div className="space-y-2">
                        <h1 className="font-poppins text-3xl tracking-tight md:text-5xl">{event.title}</h1>

                        <div className="flex flex-wrap items-center gap-3">
                            <Badge variant="outline" className={`animate-pulse shadow-lg md:text-xs ${statusColors.event[eventStatus]}`}>
                                {eventStatus}
                            </Badge>

                            <Badge variant="outline" className="flex items-center gap-2 px-3 py-1">
                                <span className="relative flex size-1.5">
                                    <span
                                        className={`absolute inline-flex size-full animate-ping rounded-full opacity-75 ${statusColors.eventDot[eventStatus]}`}
                                    />
                                    <span className={`relative inline-flex size-1.5 rounded-full ${statusColors.eventDot[eventStatus]}`} />
                                </span>

                                <span className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">Live Intelligence</span>
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link href={`/dashboard/events/${event.id}/vendors`}>
                        <Button
                            variant="outline"
                            className="h-8 rounded-xl px-6 text-xs font-medium tracking-tight hover:bg-zinc-50 md:h-10 md:text-sm dark:hover:bg-zinc-900"
                        >
                            Vendors <ArrowUpRight className="size-4 opacity-50" />
                        </Button>
                    </Link>

                    <Link href={`/dashboard/events/${event.id}/payments`}>
                        <Button className="h-8 rounded-xl bg-zinc-900 px-6 text-xs font-medium tracking-tight text-white hover:bg-zinc-800 md:h-10 md:text-sm dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200">
                            Financial <ReceiptText className="size-4" />
                        </Button>
                    </Link>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 rounded-xl text-xs md:h-10 md:text-sm">
                                <MoreHorizontal className="size-5" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 shadow-2xl">
                            <ExportButton eventId={id} />

                            <DropdownMenuSeparator />

                            <Link href={`/dashboard/events/${event.id}/edit`}>
                                <DropdownMenuItem>Edit Event Details</DropdownMenuItem>
                            </Link>

                            <UniversalDeleteDialog type="event" id={event.id} name={event.title} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    icon={Calendar}
                    color="indigo"
                    label="Timeline"
                    value={formatDate(new Date(event.startDate))}
                    subValue={`Ends ${formatDate(new Date(event.endDate))}`}
                />
                <StatCard icon={MapPin} color="rose" label="Location" value={event.location} subValue="On-site Venue" />
                <StatCard
                    icon={CheckCircle2}
                    color="emerald"
                    label="Milestones"
                    value={`${stats.taskCompletion.toFixed(0)}%`}
                    subValue={`${stats.completedTasksCount} / ${stats.totalTasksCount} tasks done`}
                />
                <StatCard
                    icon={Truck}
                    color="orange"
                    label="Supply Chain"
                    value={`${eventVendors.length} Vendors`}
                    subValue={`${stats.paidVendorsCount} Settlements`}
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <OverviewCard
                    icon={<IconCurrencyDollar className="size-5 text-emerald-500" />}
                    label="Total Budget"
                    value={stats.budget}
                    color="text-emerald-500"
                />
                <OverviewCard
                    icon={<ReceiptText className="size-5 text-blue-500" />}
                    label="Vendor Liability"
                    value={stats.totalContracted}
                    color="text-blue-500"
                />
                <OverviewCard
                    icon={<IconCash className="text-muted-foreground size-5" />}
                    label="Settled"
                    value={stats.totalPaidToVendor}
                    color="text-muted-foreground"
                />
                <OverviewCard
                    icon={<Landmark className="size-5 text-emerald-500" />}
                    label="Reserves"
                    value={stats.remainingBalance}
                    color="text-emerald-500"
                />
            </div>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                <div className="order-2 space-y-12 md:order-1 lg:col-span-7">
                    <OverviewCard
                        icon={<DollarSign className="size-5 text-emerald-500" />}
                        dark
                        darkLabel={stats.pendingBalance < 0 ? "Credit Balance" : "Outstanding Account"}
                        value={stats.pendingBalance}
                        paymentCompletion={stats.paymentCompletion}
                        color="text-emerald-500"
                    />

                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900">
                                <Briefcase className="size-5" />
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight">The Vision</h3>
                        </div>

                        <div className="relative overflow-hidden rounded-4xl border bg-linear-to-br from-white to-zinc-50/50 p-8 shadow-sm dark:from-zinc-950 dark:to-zinc-900/50">
                            <p className="text-muted-foreground text-lg leading-relaxed font-medium dark:text-zinc-400">
                                {event.description || "Establish a strategic vision for this event to guide vendor selection and guest experience."}
                            </p>
                            <div className="absolute -right-4 -bottom-8 opacity-5">
                                <Briefcase className="size-32" />
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
                            <h3 className="text-2xl font-bold tracking-tight">Active Milestones</h3>

                            <Link
                                href={`/dashboard/events/${event.id}/tasks`}
                                className="hover:text-primary text-muted-foreground text-xs font-bold tracking-widest uppercase transition-colors duration-300"
                            >
                                Expand Timeline →
                            </Link>
                        </div>

                        <div className="">
                            {stats.totalTasksCount === 0 ? (
                                <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed py-16 text-center">
                                    <PlusCircle className="mb-4 size-10 text-zinc-300" />
                                    <p className="text-lg font-bold">No Milestones Defined</p>
                                    <p className="text-muted-foreground mt-1 mb-6 max-w-xs text-sm">
                                        Initialize your planning sequence by adding your first task.
                                    </p>
                                    <TaskSheet eventId={id} />
                                </div>
                            ) : activeTasks.length === 0 ? (
                                <div className="flex flex-col items-center justify-center rounded-[2rem] border bg-emerald-500/5 py-16 text-center dark:bg-emerald-500/10">
                                    <CheckCircle className="mb-4 size-10 text-emerald-500" />
                                    <p className="text-lg font-bold">Operational Excellence</p>
                                    <p className="text-muted-foreground text-sm">All current milestones have been successfully cleared.</p>
                                </div>
                            ) : (
                                activeTasks
                                    .slice(0, 5)
                                    .map((task, idx) => (
                                        <TimelineItem
                                            isFirst={idx === 0}
                                            isLast={idx === 4 || idx === activeTasks.length - 1}
                                            key={task.id}
                                            time={formatDate(new Date(task.dueDate))}
                                            title={task.title}
                                            status={task.status as TaskStatus}
                                        />
                                    ))
                            )}
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900">
                                <Clock className="size-5" />
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight">Audit Trail</h3>
                        </div>

                        {activity.length === 0 ? (
                            <div className="text-muted-foreground rounded-2xl border border-dashed p-8 text-center text-sm font-medium">
                                Synchronizing activity logs...
                            </div>
                        ) : (
                            <div className="dark:scrollbar-thumb-muted dark:scrollbar-track-accent max-h-136 scrollbar-thin overflow-y-auto pr-2">
                                {activity.map((item, idx) => (
                                    <ActivityCard isFirst={idx === 0} isLast={idx === activity.length - 1} item={item} key={item.id} />
                                ))}
                            </div>
                        )}
                    </section>
                </div>

                <div className="order-1 space-y-8 md:order-2 lg:col-span-5">
                    <EventPulse
                        taskPercentage={stats.taskCompletion}
                        clientName={event.clientName}
                        location={event.location}
                        startDate={new Date(event.startDate)}
                        endDate={new Date(event.endDate)}
                    />

                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black tracking-[0.3em] text-zinc-400 uppercase">Capital Management</h3>
                        <BudgetTracker
                            utilizationPercentage={stats.utilizationPercentage}
                            remainingBudget={stats.remainingBudget}
                            isOverBudget={stats.isOverBudget}
                            startDate={new Date(event.startDate)}
                            endDate={new Date(event.endDate)}
                        />
                    </div>

                    <DirectAccess
                        event={event}
                        events={events}
                        eventVendors={eventVendors}
                        clientName={event.clientName}
                        email={event.clientEmail || null}
                    />

                    <SummaryCard overdueVendors={stats.overdueVendorsCount} pendingTasks={stats.pendingTasksCount} />
                </div>
            </div>
        </main>
    );
}
