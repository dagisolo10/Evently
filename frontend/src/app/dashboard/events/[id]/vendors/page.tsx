"use client";

import { PageSkeleton } from "@/components/page-skeletons";
import EventVendorsTable from "@/components/vendor/event-vendors-table";
import { LinkVendorForEvent } from "@/components/vendor/vendor-to-event-link";
import { eventDetailQueryOptions, globalVendorsQueryOptions } from "@/lib/query-options";
import { useQueries } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function EventVendorsPage() {
    const { id } = useParams<{ id: string }>();

    const queries = useQueries({
        queries: [eventDetailQueryOptions.detail({ id }), eventDetailQueryOptions.eventVendors({ id }), globalVendorsQueryOptions()],
    });

    const event = queries[0].data;
    const vendors = queries[1].data?.eventVendors ?? [];
    const globalVendors = queries[2].data?.globalVendors ?? [];
    const isPending = queries.some((q) => q.isPending);

    if (isPending || !event) {
        return <PageSkeleton tag="event-vendors" />;
    }

    return (
        <main className="w-full space-y-6">
            <header className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="bg-primary/5 pointer-events-none absolute -top-24 -left-24 hidden size-96 blur-[120px] dark:block" />

                <div className="relative space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary h-1 w-8 rounded-full" />
                        <span className="text-muted-foreground text-[10px] font-black tracking-[0.3em] uppercase">Partner Network</span>
                    </div>

                    <h1 className="text-4xl font-black tracking-tighter text-zinc-900 uppercase italic sm:text-5xl dark:text-white">
                        {event.title} <span className="text-zinc-400 dark:text-zinc-600">VENDORS</span>
                    </h1>

                    <p className="max-w-md text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        Orchestrate partner contracts and logistical sync for this sequence.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <LinkVendorForEvent mainButton eventId={id} eventVendors={vendors} eventTitle={event.title} globalVendors={globalVendors} />
                </div>
            </header>

            <EventVendorsTable eventVendors={vendors} eventId={id} eventTitle={event.title} globalVendors={globalVendors} />
        </main>
    );
}
