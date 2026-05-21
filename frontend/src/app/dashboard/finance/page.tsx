"use client";

import { PageSkeleton } from "@/components/page-skeletons";
import FinanceStatCard from "@/components/payment/finance-stats-card";
import { PaymentModal } from "@/components/payment/payment-modal";
import PaymentTable from "@/components/payment/payment-table";
import { Button } from "@/components/ui/button";
import { formatUSD } from "@/helper/helper-functions";
import { eventsQueryOptions, eventVendorsQueryOptions, financeStatsQueryOptions, paymentsQueryOptions } from "@/lib/query-options";
import { useQueries } from "@tanstack/react-query";
import { ArrowDownCircle, ArrowUpCircle, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useState } from "react";

export default function Budgeting() {
    const queries = useQueries({
        queries: [financeStatsQueryOptions(), eventsQueryOptions(), eventVendorsQueryOptions(), paymentsQueryOptions()],
    });

    const [open, setOpen] = useState<boolean>(false);

    const stats = queries[0].data;
    const events = queries[1].data ?? [];
    const eventVendors = queries[2].data?.eventVendors ?? [];
    const payments = queries[3].data?.payments ?? [];
    const isPending = queries.some((q) => q.isPending);

    if (isPending) {
        return <PageSkeleton tag="finance" />;
    }

    const budget = stats?.budget ?? 0;
    const collected = stats?.collected ?? 0;
    const liability = stats?.liability ?? 0;
    const paidOut = stats?.paidOut ?? 0;
    const cashOnHand = stats?.cashOnHand ?? 0;
    const profit = stats?.profit ?? 0;
    const margin = stats?.margin ?? 0;

    return (
        <main className="space-y-8 pb-12">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                    <h1 className="font-poppins text-3xl tracking-tight md:text-5xl">
                        Financial<span className="from-primary bg-linear-to-r to-purple-600 bg-clip-text text-transparent"> Ledger</span>
                    </h1>
                    <p className="text-muted-foreground text-sm font-medium">Manage inbound client payments and vendor payouts.</p>
                </div>

                <Button onClick={()=> setOpen(true)} variant={"outline"} className="font-poppins px-4 font-semibold">
                    Process Payment
                </Button>

                <PaymentModal open={open} setOpen={setOpen} events={events} eventVendors={eventVendors} />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <FinanceStatCard
                    title="Total Revenue"
                    value={budget}
                    subValue={`Collected: ${formatUSD(collected)}`}
                    icon={TrendingUp}
                    color="emerald"
                />
                <FinanceStatCard
                    title="Vendor Liabilities"
                    value={liability}
                    subValue={`Paid Out: ${formatUSD(paidOut)}`}
                    icon={TrendingDown}
                    color="rose"
                />
                <FinanceStatCard title="Cash on Hand" value={cashOnHand} subValue="Liquid funds in escrow" icon={Wallet} color="blue" />
                <FinanceStatCard
                    title="Est. Net Profit"
                    value={profit}
                    subValue={`${margin}% margin`}
                    icon={profit > 0 ? ArrowUpCircle : ArrowDownCircle}
                    color={profit > 0 ? "emerald" : "rose"}
                />
            </div>

            <PaymentTable events={events} payments={payments} eventVendors={eventVendors} />
        </main>
    );
}
