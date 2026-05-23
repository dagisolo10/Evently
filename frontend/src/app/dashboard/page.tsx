"use client";

import EmptyState from "@/components/common/empty-state";
import UniversalDeleteDialog from "@/components/common/universal-alert-dialog";
import GlowCard from "@/components/others/glow-card";
import TableWrapper from "@/components/others/table-border-wrapper";
import { PageSkeleton } from "@/components/page-skeletons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { statusColors } from "@/constants/status-colors";
import { getEventStatus } from "@/helper/get-status";
import { formatDate, formatUSD } from "@/helper/helper-functions";
import { dashboardStatsQueryOptions, eventsQueryOptions, syncUserQueryOptions } from "@/lib/query-options";
import { cn } from "@/lib/utils";
import type { DashboardStats } from "@/types/models/stats";
import type { LucideIcon } from "@/types/types";
import { IconCurrencyDollar } from "@tabler/icons-react";
import { useQueries } from "@tanstack/react-query";
import { ArrowRight, Calendar, CalendarIcon, CheckCircle2, MoreHorizontal, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
    const queries = useQueries({
        queries: [syncUserQueryOptions(), eventsQueryOptions(), dashboardStatsQueryOptions()],
    });

    const user = queries[0].data;
    const events = queries[1].data ?? [];
    const dashboardStats = queries[2].data ?? ({} as DashboardStats);
    const isPending = queries.some((q) => q.isPending);

    if (isPending) {
        return <PageSkeleton tag="dashboard" />;
    }

    return (
        <div className="space-y-10">
            <header className="relative flex flex-col gap-2">
                <div className="bg-primary/5 pointer-events-none absolute -top-24 -left-24 hidden size-96 blur-[120px] dark:block" />
                <h1 className="font-poppins text-3xl tracking-tight md:text-5xl">
                    Welcome back,
                    <span className="from-primary bg-linear-to-r to-purple-600 bg-clip-text text-transparent"> {user?.name || "Organizer"}!</span>
                </h1>
                <p className="text-muted-foreground text-sm font-medium">Here is what&apos;s happening with your events today.</p>
            </header>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <SummaryCard
                    title="Active Events"
                    value={dashboardStats.activeEventsCount}
                    icon={Calendar}
                    description="Ongoing and upcoming events"
                    color="blue"
                />
                <SummaryCard
                    title="Uncollected"
                    value={dashboardStats.uncollected}
                    icon={TrendingUp}
                    description="Remaining client balances"
                    color="emerald"
                    isCurrency
                />
                <SummaryCard
                    title="Vendor Debt"
                    value={dashboardStats.vendorDebt}
                    icon={IconCurrencyDollar}
                    description="Total accounts payable"
                    color="orange"
                    isCurrency
                />
                <SummaryCard
                    title="Overdue Tasks"
                    value={dashboardStats.urgentTasks}
                    icon={CheckCircle2}
                    description="Pending past-due actions"
                    color="red"
                />
            </div>

            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="font-poppins text-2xl font-bold tracking-tight">Recent Events</h2>
                    <Button variant="ghost" className="group text-primary hover:text-primary font-semibold" asChild>
                        <Link href="/dashboard/events" className="flex items-center gap-2">
                            View All <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>

                <TableWrapper>
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow className="font-bold hover:bg-transparent">
                                <TableHead>Event Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Budget</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>End Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {events.length === 0 ? (
                                <EmptyState type="event" colSpan={7} />
                            ) : (
                                events.slice(0, 5).map((event) => (
                                    <TableRow key={event.id}>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{event.title}</span>
                                                <span className="text-muted-foreground text-xs">{event.location}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="ghost" className={statusColors.event[getEventStatus(event.startDate, event.endDate)]}>
                                                {getEventStatus(event.startDate, event.endDate)}
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="text-sm">{event.clientName}</TableCell>
                                        <TableCell className="text-primary text-sm font-semibold">{formatUSD(event.budget)}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-sm">
                                                <CalendarIcon className="size-3" />
                                                {formatDate(new Date(event.startDate))}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-sm">
                                                <CalendarIcon className="size-3" />
                                                {formatDate(new Date(event.endDate))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="pr-6 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="size-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end" className="w-36">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/dashboard/events/${event.id}`}>See details</Link>
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/dashboard/events/${event.id}/edit`}>Edit</Link>
                                                    </DropdownMenuItem>

                                                    <DropdownMenuSeparator />

                                                    <UniversalDeleteDialog type="event" id={event.id} name={event.title} />
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableWrapper>
            </section>
        </div>
    );
}

interface SummaryItem {
    title: string;
    value: number;
    icon: LucideIcon;
    description: string;
    isCurrency?: boolean;
    color: "blue" | "orange" | "emerald" | "red";
}

function SummaryCard({ title, value, icon: Icon, description, isCurrency, color }: SummaryItem) {
    const displayValue = isCurrency ? formatUSD(Number(value)) : value;

    const colorMap = {
        blue: "text-blue-500 border-blue-500/20 bg-blue-500",
        orange: "text-orange-500 border-orange-500/20 bg-orange-500",
        emerald: "text-emerald-500 border-emerald-500/20 bg-emerald-500",
        red: "text-red-500 border-red-500/20 bg-red-500",
    };

    const currentStyles = colorMap[color];

    return (
        <GlowCard color={currentStyles.split(" ")[2] ?? ""}>
            <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <div
                        className={cn(
                            currentStyles.split(" ").slice(0, 2).join(" "),
                            "grid size-10 place-items-center rounded-xl border transition-transform duration-500 group-hover:scale-110",
                        )}
                    >
                        <Icon className="size-5" />
                    </div>
                    <span className="font-poppins text-muted-foreground text-xs font-bold tracking-widest uppercase">{title}</span>
                </div>

                <div className="space-y-1">
                    <h3 className="font-poppins text-3xl font-extrabold">{displayValue}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed font-medium">{description}</p>
                </div>
            </div>
        </GlowCard>
    );
}
