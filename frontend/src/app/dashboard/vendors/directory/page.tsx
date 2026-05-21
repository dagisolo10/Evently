"use client";

import { PageSkeleton } from "@/components/page-skeletons";
import { CreateGlobalVendor } from "@/components/vendor/global-vendor-create";
import GlobalVendorsTable from "@/components/vendor/global-vendors-table";
import { eventsQueryOptions, eventVendorsQueryOptions, globalVendorsQueryOptions } from "@/lib/query-options";
import { useQueries } from "@tanstack/react-query";

export default function VendorDirectory() {
    const queries = useQueries({
        queries: [eventsQueryOptions(), globalVendorsQueryOptions(), eventVendorsQueryOptions()],
    });

    const events = queries[0].data ?? [];
    const globalVendors = queries[1].data?.globalVendors ?? [];
    const eventVendors = queries[2].data?.eventVendors ?? [];
    const isPending = queries.some((q) => q.isPending);

    if (isPending) {
        return <PageSkeleton tag="vendor-directory" />;
    }

    return (
        <main className="w-full space-y-6">
            <header className="relative flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div className="bg-primary/5 pointer-events-none absolute -top-24 -left-24 hidden size-96 blur-[120px] dark:block" />

                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary h-6 w-1 rounded-full" />
                        <span className="text-muted-foreground text-[10px] font-bold tracking-[0.3em] uppercase">Resource Management</span>
                    </div>
                    <h1 className="font-poppins text-4xl tracking-tight uppercase lg:text-5xl">
                        Vendor <span className="text-gradient">Directory</span>
                    </h1>
                    <p className="text-muted-foreground/80 max-w-md text-sm leading-relaxed font-medium">
                        Centralized database of service providers. Oversee contracts, performance, and cross-event availability.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden flex-col items-end px-4 text-right lg:flex">
                        <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">Total Database</span>
                        <span className="font-manrope text-xl font-bold">{globalVendors.length}</span>
                    </div>

                    <CreateGlobalVendor />
                </div>
            </header>

            <GlobalVendorsTable globalVendors={globalVendors} events={events} eventVendors={eventVendors} />
        </main>
    );
}
