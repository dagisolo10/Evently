"use client";

import { PageSkeleton } from "@/components/page-skeletons";
import FinanceStatCard from "@/components/payment/finance-stats-card";
import { PaymentModal } from "@/components/payment/payment-modal";
import PaymentTable from "@/components/payment/payment-table";
import { Button } from "@/components/ui/button";
import { formatUSD } from "@/helper/helper-functions";
import { eventDetailQueryOptions, eventsQueryOptions } from "@/lib/query-options";
import { useQueries } from "@tanstack/react-query";
import { ArrowDownCircle, ArrowUpCircle, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function EventPayments() {
    const { id } = useParams<{ id: string }>();
    const [open, setOpen] = useState<boolean>(false);

    const queries = useQueries({
        queries: [
            eventsQueryOptions(),
            eventDetailQueryOptions.detail({ id }),
            eventDetailQueryOptions.eventFinancialStats({ id }),
            eventDetailQueryOptions.eventVendors({ id }),
            eventDetailQueryOptions.eventPayments({ id }),
        ],
    });

    const events = queries[0].data ?? [];
    const event = queries[1].data;
    const stats = queries[2].data;
    const eventVendors = queries[3].data?.eventVendors ?? [];
    const payments = queries[4].data?.payments ?? [];
    const isFetching = queries.some((q) => q.isFetching);

    if (isFetching || !event || !stats) {
        return <PageSkeleton tag="event-payments" />;
    }

    return (
        <main className="space-y-8 pb-12">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <div className="mb-1 flex items-center gap-2">
                        <span className="h-1 w-6 rounded-full bg-emerald-500" />
                        <p className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">Project Finance</p>
                    </div>
                    <h1 className="font-poppins text-3xl tracking-tight md:text-5xl">{event.title}</h1>
                    <p className="mt-1 font-medium text-zinc-500">Detailed financial breakdown and transaction history for this event.</p>
                </div>

                <div className="flex items-center justify-end gap-4">
                    <Button onClick={() => setOpen(true)} variant={"outline"} className="font-poppins px-4 font-semibold">
                        Process Payment
                    </Button>
                    <PaymentModal open={open} setOpen={setOpen} event={event} events={events} eventVendors={eventVendors} />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <FinanceStatCard
                    title="Total Budget"
                    value={stats.budget}
                    subValue={`Collected: ${formatUSD(stats.collected)}`}
                    icon={TrendingUp}
                    color="emerald"
                />
                <FinanceStatCard
                    title="Vendor Expenses"
                    value={stats.liability}
                    subValue={`Paid Out: ${formatUSD(stats.paidOut)}`}
                    icon={TrendingDown}
                    color="rose"
                />
                <FinanceStatCard title="Cash on Hand" value={stats.cashOnHand} subValue="Liquid funds in escrow" icon={Wallet} color="blue" />
                <FinanceStatCard
                    title="Est. Net Profit"
                    value={stats.profit}
                    subValue={`${stats.margin}% margin`}
                    icon={stats.profit > 0 ? ArrowUpCircle : ArrowDownCircle}
                    color={stats.profit > 0 ? "emerald" : "rose"}
                />
            </div>

            <PaymentTable events={events} eventVendors={eventVendors} eventId={id} payments={payments} />
        </main>
    );
}
